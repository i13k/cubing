const { MongoClient } = require("mongodb");
const Decimal = require("decimal.js").Decimal;
const { ArraySortScoreResponse } = require("@/app/messages");

const floatToTime = tseconds => {
    if (typeof tseconds === "undefined" || tseconds === null) return "";
    if (tseconds.toString() === "0") return "DNF";
    if (!(tseconds instanceof Decimal)) tseconds = new Decimal(tseconds);

    const minutes = tseconds.div(60).floor();
    let seconds = tseconds.sub(minutes.mul(60));
    let millis = seconds.sub(seconds.floor()).mul(1000).round().toString();
    seconds = seconds.floor().toString();

    if (seconds.length == 1) seconds = "0" + seconds;
    if (millis.length == 1) millis = "00" + millis;
    else if (millis.length == 2) millis = "0" + millis;
    
    return minutes.toString() + ":" + seconds + "." + millis;
};

export async function GET(rq) {
    const client = new MongoClient("mongodb://localhost:27017/");
    await client.connect();

    const database = client.db("cubing");
    const scoresCursor = await database.collection("scores").find({ }, { projection: { _id: 0 } });
    const regInfo = await database.collection("info").findOne({ }, { projection: { _id: 0 } });

    let scores = await scoresCursor.toArray();

    scores = scores.filter(s => s.times.length > 0);

    for (let i = 0; i < scores.length; ++i) {
        let DNFs = 0;
        for (let j = 0; j < scores[i].times.length; ++j)
            if (scores[i].times[j] === 0)
                ++DNFs;
        
        switch (regInfo.type) {
            case "A":
                if (DNFs > 1) {
                    scores[i].avg = "DNF";
                    scores[i].sum = new Decimal(Infinity);
                    scores[i].gray = [0];
                } else {
                    let min = scores[i].times[0], max = scores[i].times[0], removedMin = false, removedMax = false, timesCorr = [];

                    scores[i].times.map(time => {
                        if (time == 0) timesCorr.push(Infinity);
                        else timesCorr.push(time);
                    });

                    timesCorr.slice(1).map(time => {
                        if (time < min) min = time;
                        if (time > max) max = time;
                    });

                    let newTimes = [];

                    timesCorr.map(time => {
                        if (time == max && !removedMax)
                            removedMax = true;
                        else if (time == min && !removedMin)
                            removedMin = true;
                        else
                            newTimes.push(time);
                    });

                    scores[i].sum = new Decimal(0);
                    newTimes.map(time => {
                        scores[i].sum = scores[i].sum.add(time);
                    });

                    if (max === Infinity) max = 0;
                    if (min === Infinity) min = 0;
                    
                    scores[i].gray = [min, max];
                    scores[i].avg = floatToTime(scores[i].sum.div(regInfo.stages - 2));
                }
                break;
            case "B":
                let newTimes = scores[i].times.filter(time => time !== 0);
                if (newTimes.length === 0) {
                    scores[i].avg = "DNF";
                    scores[i].sum = new Decimal(Infinity);
                    scores[i].gray = [0];
                } else {
                    let min = newTimes[0];
                    newTimes.slice(1).map(time => {
                        if (time < min) min = time;
                    });
                    scores[i].sum = new Decimal(min);
                    scores[i].avg = floatToTime(min);
                    scores[i].gray = scores[i].times.filter(time => time !== min);
                }
                break;
            case "M":
                if (DNFs > 0) {
                    scores[i].avg = "DNF";
                    scores[i].sum = new Decimal(Infinity);
                    scores[i].gray = [0];
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

    for (let i = 0; i < scores.length; ++i) {
        if (i === 0) scores[i].place = 1;
        else if (scores[i].sum.eq(scores[i - 1].sum)) scores[i].place = scores[i - 1].place;
        else scores[i].place = i + 1;

        scores[i].green = scores[i].place <= regInfo.qualification;
    }

    for (let i = 0; i < scores.length; ++i) delete scores[i].sum;

    const isDelete = new URL(rq.url).searchParams.get("delete");
    if (isDelete === "true") {
        for (let i = 0; i < scores.length; ++i)
            if (!scores[i].green)
                await database.collection("scores").deleteOne({ name: scores[i].name });
        
        await database.collection("scores").updateMany({ }, { $set: { times: [] } });
    }

    await client.close();
    return new Response(String.fromCharCode.apply(null, ArraySortScoreResponse.encode({ responses: scores }).finish()), {
        status: 200,
        headers: { "content-type": "application/octet-stream" }
    });
}

export const dynamic = "force-dynamic";