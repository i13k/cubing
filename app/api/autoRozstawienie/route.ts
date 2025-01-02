import * as mongo from "mongodb";

const PEOPLE_PER_GROUP: number = 6;

interface Contestant {
    name: string;
    times: number[];
}

export async function GET(_: Request) {
    const client: mongo.MongoClient = new mongo.MongoClient("mongodb://localhost:27017/");
    await client.connect();

    const db: mongo.Db = client.db("cubing");

    const contestantsCursor: mongo.FindCursor =
        await db.collection("scores").find({ times: [] }, { projection: { _id: 0, times: 0, timesString: 0 } });
    
    const contestants: Contestant[] = await contestantsCursor.toArray();
    let names: string[] = [];

    for (let i: number = 0; i < PEOPLE_PER_GROUP; ++i)
        contestants[i] && names.push(contestants[i].name);

    await db.collection("info").updateOne({ }, { $set: { people: names, currentRoute: "/info/getready" } });
    return new Response(null, { status: 204 });
}

export const dynamic: string = "force-dynamic";