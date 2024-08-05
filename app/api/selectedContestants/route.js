const { MongoClient } = require("mongodb");

export async function PUT(rq) {
    const names = await rq.json();

    const client = new MongoClient("mongodb://localhost:27017/");
    await client.connect();

    const database = client.db("cubing");
    const info = database.collection("info");
    
    await info.findOneAndUpdate({ }, { $set: { people: names.names } });

    await client.close();
    return Response.json({ }, { status: 200 });
}