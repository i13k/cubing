const { MongoClient } = require("mongodb");

export async function GET() {
    const client = new MongoClient("mongodb://localhost:27017/");
    await client.connect();

    const info = await client.db("cubing").collection("info").findOne({ }, { projection: { _id: 0 } });

    await client.close();
    return Response.json(info, { status: 200 });
}

export const dynamic = "force-dynamic";