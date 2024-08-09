const { MongoClient } = require("mongodb");

const PEOPLE_PER_GROUP = 6;

export async function GET(_) {
    const client = new MongoClient("mongodb://localhost:27017/");
    await client.connect();

    const db = client.db("cubing");
    const temp = await db.collection("scores").find({ times: [] }, { projection: { _id: 0 } });
    const contestants = await temp.toArray();
    let names = [];
    if (contestants.length < PEOPLE_PER_GROUP)
        contestants.forEach(contestant => { names.push(contestant.name); });
    else
        for (let i = 0; i < PEOPLE_PER_GROUP; ++i)
            names.push(contestants[i].name);

    await db.collection("info").updateOne({ }, { $set: { people: names, currentRoute: "/info/getready" } });
    return new Response(null, { status: 204 });
}

export const dynamic = "force-dynamic";