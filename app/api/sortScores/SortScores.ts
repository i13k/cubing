import { ArraySortScoreResponse } from "@/app/messages";
import { MongoClient } from "mongodb";

const zeroPad = (num: number, places: number): string => String(num).padStart(places, '0');

const numberToTimeString = (ms: number): string => {
    if (typeof ms === "undefined" || ms === null) return "";
    if (ms.toString() === "0") return "DNF";

    ms = Math.round(ms);

    const minutes: string = Math.floor(ms / 60000).toString();
    let seconds: string = zeroPad(Math.floor((ms % 60000) / 1000), 2);
    const millis: string = zeroPad(ms % 1000, 3);

    const minutePart = minutes == "0" ? "" : (minutes + ":");
    if (minutePart == "" && seconds[0] == "0") seconds = seconds.slice(1);

    return minutePart + seconds + "." + millis;
};

export default async function getResponse(client: MongoClient, isDelete: boolean) {
    const database = client.db("cubing");
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
                if (DNFs > 1) { // if more than 1 DNFs
                    scores[i].avg = "DNF";
                    scores[i].sum = Infinity;
                    scores[i].gray = ["DNF"];
                } else {
                    let removedMin: boolean = false,
                        removedMax: boolean = false,
                        times: number[] = [];

                    scores[i].times.map(time => {
                        if (time == 0) times.push(Infinity);
                        else times.push(time);
                    });

                    let min: number = times[0],
                        max: number = times[0];

                    times.map(time => {
                        if (time < min) min = time;
                        if (time > max) max = time;
                    });
                    let timesWithoutMinmax: number[] = [];

                    times.map(time => {
                        if (time == max && !removedMax)
                            removedMax = true;
                        else if (time == min && !removedMin)
                            removedMin = true;
                        else
                            timesWithoutMinmax.push(time);
                    });

                    scores[i].sum = 0;
                    timesWithoutMinmax.map(time => {
                        scores[i].sum += time;
                    });

                    if (max === Infinity) max = 0;
                    if (min === Infinity) min = 0;
                    
                    scores[i].gray = [numberToTimeString(min), numberToTimeString(max)];
                    scores[i].avg = numberToTimeString(scores[i].sum/(regInfo.stages - 2));
                }
                break;
            case "B":
                let times: number[] = scores[i].times.filter(time => time !== 0);
                if (times.length === 0) { // if all times are DNFs
                    scores[i].avg = "DNF";
                    scores[i].sum = Infinity;
                    scores[i].gray = ["DNF"];
                } else {
                    let min: number = times[0];
                    times.map(time => {
                        if (time < min) min = time;
                    });
                    scores[i].sum = min;
                    scores[i].avg = numberToTimeString(min);
                    scores[i].gray = ["DNF"];
                }
                break;
            case "M":
                if (DNFs > 0) { // if 1 or more DNFs
                    scores[i].avg = "DNF";
                    scores[i].sum = Infinity;
                    scores[i].gray = ["DNF"];
                } else {
                    scores[i].sum = 0;
                    scores[i].times.map(time => {
                        scores[i].sum += time;
                    });
                    
                    scores[i].avg = numberToTimeString(scores[i].sum/regInfo.stages);
                    scores[i].gray = [];
                }
                break;
        }
    }

    scores = scores.sort((a, b) => a.sum - b.sum);

    for (let i: number = 0; i < scores.length; ++i) {
        if (i === 0) scores[i].place = 1;
        else if (scores[i].sum == scores[i - 1].sum) scores[i].place = scores[i - 1].place;
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