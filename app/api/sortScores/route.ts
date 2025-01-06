const { MongoClient } = require("mongodb");
import getResponse from "./SortScores";

export async function GET(rq: Request) {
    const isDelete = new URL(rq.url).searchParams.get("delete") === "true";
    const client = new MongoClient("mongodb://localhost:27017/");
    await client.connect();

    const database = client.db("cubing");
    
    if (!isDelete) {
        const cacheData = await database.collection("cache").findOne({ }, { projection: { _id: 0 }});
        if (cacheData.cacheValid) {
            return new Response(cacheData.cachedResponse, {
                status: 200,
                headers: { "content-type": "application/octet-stream" }
            });
        }
    }
    
    const response: string = await getResponse(client, isDelete);

    await database.collection("cache").updateOne({ }, { $set: { cacheValid: !isDelete, cachedResponse: response } });
    await client.close();

    return new Response(response, {
        status: 200,
        headers: { "content-type": "application/octet-stream" }
    });
}

export const dynamic: string = "force-dynamic";