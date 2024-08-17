import * as mongo from "mongodb";

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
    
    await scores.insertOne({ name: name, times: [] });

    await client.close();
    return new Response(null, { status: 204 });
}

export async function DELETE(rq: Request) {
    const name: string = await rq.text();
    const client: mongo.MongoClient = new mongo.MongoClient("mongodb://localhost:27017/");
    await client.connect();

    await client.db("cubing").collection("scores").deleteOne({ name: name });
    await client.close();

    return new Response(null, { status: 204 });
}

function parseTimeString(timeString: string): number {
    const min: number = parseInt(timeString[0]),
          sec: number = parseFloat(timeString.slice(2, 8));
    return 60*min + sec;
}

interface Contestant {
    name: string;
    times: string[];
}

export async function PATCH(rq: Request) {
    const req: Contestant = await rq.json();
    let times: number[] = [];
    
    const client: mongo.MongoClient = new mongo.MongoClient("mongodb://localhost:27017/");
    await client.connect();

    req.times.forEach(time => { times.push(parseTimeString(time)); });

    await client.db("cubing").collection("scores")
        .updateOne({ name: req.name }, { $set: { times: times } });
    await client.close();

    return new Response(null, { status: 204 });
}