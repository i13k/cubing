import * as mongo from "mongodb";
const { ArrayScoresResponse } = require("@/app/messages");

interface Score {
    name: string;
    times: number[];
}

export async function GET() {
    const client: mongo.MongoClient = new mongo.MongoClient("mongodb://localhost:27017/");
    await client.connect();

    const scoresCursor: mongo.FindCursor =
        await client.db("cubing").collection("scores").find({ }, { projection: { _id: 0 } });
    const scoresArray: Score[] = await scoresCursor.toArray();

    await client.close();
    return new Response(String.fromCharCode.apply(null, ArrayScoresResponse.encode({ responses: scoresArray }).finish()), {
        status: 200,
        headers: { "content-type": "application/octet-stream" }
    });
}

export const dynamic: string = "force-dynamic";