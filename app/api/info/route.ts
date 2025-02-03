import * as mongo from "mongodb";

export async function GET() {
    const client: mongo.MongoClient = new mongo.MongoClient("mongodb://localhost:27017/");
    await client.connect();

    const info: mongo.WithId<mongo.BSON.Document> =
        await client.db("cubing").collection("info").findOne({ }, { projection: { _id: 0 } });

    await client.close();
    return Response.json(info, { status: 200 });
}

export const dynamic = "force-dynamic";