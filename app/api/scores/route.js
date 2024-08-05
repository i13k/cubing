const { MongoClient } = require("mongodb");
const { ArrayScoresResponse } = require("@/app/messages");

export async function GET() {
    const client = new MongoClient("mongodb://localhost:27017/");
    await client.connect();

    const database = client.db("cubing");
    const scoresCursor = await database.collection("scores").find({ }, { projection: { _id: 0 } });
    const scoresArray = await scoresCursor.toArray();

    await client.close();
    return new Response(String.fromCharCode.apply(null, ArrayScoresResponse.encode({ responses: scoresArray }).finish()), {
        status: 200,
        headers: { "content-type": "application/octet-stream" }
    });
}

export const dynamic = "force-dynamic";