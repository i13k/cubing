import { ArraySortScoreResponse } from "@/app/messages";
import { MongoClient } from "mongodb";
const { Decimal } = require("decimal.js");

const floatToTime = (tseconds: any): string => {
    if (typeof tseconds === "undefined" || tseconds === null) return "";
    if (tseconds.toString() === "0") return "DNF";
    if (!(tseconds instanceof Decimal)) tseconds = new Decimal(tseconds);

    const minutes: typeof Decimal = tseconds.div(60).floor();
    let seconds = tseconds.sub(minutes.mul(60));
    let millis = seconds.sub(seconds.floor()).mul(1000).round().toString();
    seconds = seconds.floor().toString();

    if (seconds.length == 1) seconds = "0" + seconds;
    if (millis.length == 1) millis = "00" + millis;
    else if (millis.length == 2) millis = "0" + millis;
    
    return minutes.toString() + ":" + seconds + "." + millis;
};

export default async function getResponse(client: MongoClient, isDelete: boolean) {
    const database = client.db("cubing");

    Decimal.set({ precision: 7 });
    const scoresCursor = await database.collection("scores").find({ }, { projection: { _id: 0 } });
    const regInfo = await database.collection("info").findOne({ }, { projection: { _id: 0 } });

    let scores: any = await scoresCursor.toArray();

    scores = scores.filter(s => s.times.length > 0);

    for (let i: number = 0; i < scores.length; ++i) {
        let DNFs: number = 0;
        for (let j: number = 0; j < scores[i].times.length; ++j) {
            if (scores[i].times[j] === 0)
                ++DNFs;
            if (DNFs == 2) break;
        }
        
        switch (regInfo.type) {
            case "A":
                if (DNFs > 1) {
                    scores[i].avg = "DNF";
                    scores[i].sum = new Decimal(Infinity);
                    scores[i].gray = ["DNF"];
                } else {
                    let min: number = scores[i].times[0],
                        max: number = scores[i].times[0],
                        removedMin: boolean = false,
                        removedMax: boolean = false,
                        timesCorr: number[] = [];

                    scores[i].times.map(time => {
                        if (time == 0) timesCorr.push(Infinity);
                        else timesCorr.push(time);
                    });

                    timesCorr.slice(1).map(time => {
                        if (time < min) min = time;
                        if (time > max) max = time;
                    });

                    let timesWithoutMinmax: number[] = [];

                    timesCorr.map(time => {
                        if (time == max && !removedMax)
                            removedMax = true;
                        else if (time == min && !removedMin)
                            removedMin = true;
                        else
                            timesWithoutMinmax.push(time);
                    });

                    scores[i].sum = new Decimal(0);
                    timesWithoutMinmax.map(time => {
                        scores[i].sum = scores[i].sum.add(time);
                    });

                    if (max === Infinity) max = 0;
                    if (min === Infinity) min = 0;
                    
                    scores[i].gray = [floatToTime(min), floatToTime(max)];
                    scores[i].avg = floatToTime(scores[i].sum.div(regInfo.stages - 2));
                }
                break;
            case "B":
                let newTimes: number[] = scores[i].times.filter(time => time !== 0);
                if (newTimes.length === 0) {
                    scores[i].avg = "DNF";
                    scores[i].sum = new Decimal(Infinity);
                    scores[i].gray = ["DNF"];
                } else {
                    let min: number = newTimes[0];
                    newTimes.slice(1).map(time => {
                        if (time < min) min = time;
                    });
                    scores[i].sum = new Decimal(min);
                    scores[i].avg = floatToTime(min);
                    scores[i].gray = ["DNF"];
                }
                break;
            case "M":
                if (DNFs > 0) {
                    scores[i].avg = "DNF";
                    scores[i].sum = new Decimal(Infinity);
                    scores[i].gray = ["DNF"];
                } else {
                    scores[i].sum = new Decimal(0);
                    scores[i].times.map(time => {
                        scores[i].sum = scores[i].sum.add(time);
                    });
                    
                    scores[i].avg = floatToTime(scores[i].sum.div(regInfo.stages));
                    scores[i].gray = [];
                }
                break;
        }
    }

    scores = scores.sort((a, b) => a.sum.sub(b.sum));

    for (let i: number = 0; i < scores.length; ++i) {
        if (i === 0) scores[i].place = 1;
        else if (scores[i].sum.eq(scores[i - 1].sum)) scores[i].place = scores[i - 1].place;
        else scores[i].place = i + 1;

        scores[i].green = scores[i].place <= regInfo.qualification;
    }

    for (let i: number = 0; i < scores.length; ++i) {
        scores[i].times = scores[i].timesString;
        delete scores[i].sum;
        delete scores[i].timesString;
    }
    
    if (isDelete) { // remove unqualified people
        for (let i: number = 0; i < scores.length; ++i)
            if (!scores[i].green)
                await database.collection("scores").deleteOne({ name: scores[i].name });
        
        await database.collection("scores").updateMany({ }, { $set: { times: [], timesString: [] } });
        // increment round number
        const round = parseInt((await database.collection("info").findOne({ })).round);
        database.collection("info").updateOne({ }, { $set: { round: (round + 1).toString() }})

    }

    return String.fromCharCode.apply(null, ArraySortScoreResponse.encode({ responses: scores }).finish());
}