import * as mongo from "mongodb";

interface SelectedContestantsRequest {
    names: string[];
}

export async function PUT(rq) {
    const names: SelectedContestantsRequest = await rq.json();

    const client: mongo.MongoClient = new mongo.MongoClient("mongodb://localhost:27017/");
    await client.connect();
    
    await client.db("cubing").collection("info").updateOne({ }, { $set: { people: names.names } });

    await client.close();
    return Response.json({ }, { status: 200 });
}