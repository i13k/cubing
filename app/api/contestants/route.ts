import * as mongo from "mongodb";
import Constants from "@/app/constants";

export async function PUT(rq: Request) {
    const name: string = await rq.text();

    const client: mongo.MongoClient = new mongo.MongoClient("mongodb://localhost:27017/");
    await client.connect();

    const scores: mongo.Collection = client.db("cubing").collection("scores");
    const score: mongo.WithId<mongo.BSON.Document> = await scores.findOne({ name: name });
    if (score != null) {
        await client.close();
        return new Response(null, { status: 409 });
    }
    
    await scores.insertOne({ name: name, times: [], timesString: [] });

    await client.close();
    return new Response(null, { status: 204 });
}

export async function DELETE(rq: Request) {
    const name: string = await rq.text();
    const client: mongo.MongoClient = new mongo.MongoClient("mongodb://localhost:27017/");
    await client.connect();

    await client.db("cubing").collection("scores").deleteOne({ name: name });
    await client.db("cubing").collection("cache").updateOne({ }, { $set: { cacheValid: false } });
    await client.close();

    return new Response(null, { status: 204 });
}

const parseTimeString = (timeString: string): number => {
    const min: number = parseInt(timeString[0]),
          sec: number = parseInt(timeString[2] + timeString[3]),
          ms:  number = parseInt(timeString[5] + timeString[6] + timeString[7]);
    return 60000*min + 1000*sec + ms;
};

interface Contestant {
    name: string;
    times: string[];
}

export async function PATCH(rq: Request) {
    const req: Contestant = await rq.json();
    let times: number[] = [];
    
    const client: mongo.MongoClient = new mongo.MongoClient("mongodb://localhost:27017/");
    await client.connect();

    
    const regInfo = await client.db("cubing").collection("info").findOne({ });
    if (req.times.length != regInfo.stages) {
        await client.close();
        return new Response(null, { status: 400 });
    }

    for (let i = 0; i < req.times.length; ++i) {
        if (!Constants.timeStringRegex.test(req.times[i])) {
            await client.close();
            return new Response(null, { status: 400 });
        }
        times.push(parseTimeString(req.times[i]));
        if (req.times[i] === Constants.DNF) req.times[i] = "DNF";
        else {
            if (req.times[i][0] == "0") req.times[i] = req.times[i].slice(2);
            if (req.times[i][0] == "0") req.times[i] = req.times[i].slice(1);
        }
    }

    await client.db("cubing").collection("scores")
        .updateOne({ name: req.name }, { $set: { times: times, timesString: req.times } });
    await client.db("cubing").collection("cache").updateOne({ }, { $set: { cacheValid: false } });
    let grouping = regInfo.grouping.filter(n => n != req.name);
    await client.db("cubing").collection("info").updateOne({ }, { $set: { grouping: grouping }});
    await client.close();

    return new Response(null, { status: 204 });
}