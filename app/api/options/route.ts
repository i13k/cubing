import * as mongo from "mongodb";

export async function PATCH(rq: Request) {
    const req = await rq.json();
    
    const client: mongo.MongoClient = new mongo.MongoClient("mongodb://localhost:27017/");
    await client.connect();

    await client.db("cubing").collection("info").updateOne({ }, { $set: req });
    await client.close();

    return new Response(null, { status: 204 });
}

export const dynamic = "force-dynamic";