const { MongoClient } = require("mongodb");

export async function PUT(rq) {
    const name = await rq.text();

    const client = new MongoClient("mongodb://localhost:27017/");
    await client.connect();

    const database = client.db("cubing");
    const scores = database.collection("scores");
    const score = await scores.findOne({ name: name });
    if (score != null) {
        await client.close();
        return new Response(null, { status: 409 });
    }
    
    await scores.insertOne({ name: name, times: [] });

    await client.close();
    return new Response(null, { status: 204 });
}

export async function DELETE(rq) {
    const name = await rq.text();
    const client = new MongoClient("mongodb://localhost:27017/");
    await client.connect();

    const database = client.db("cubing");
    const scores = database.collection("scores");

    await scores.findOneAndDelete({ name: name });
    await client.close();

    return new Response(null, { status: 204 });
}

export async function PATCH(rq) {
    let req = await rq.json();
    
    const client = new MongoClient("mongodb://localhost:27017/");
    await client.connect();

    const database = client.db("cubing");
    const scores = database.collection("scores");

    for (let i = 0; i < req.times.length; ++i) {
        let f = parseFloat(req.times[i]);
        if (Number.isNaN(f)) f = 0;
        req.times[i] = f;
    }

    await scores.findOneAndUpdate({ name: req.name }, { $set: { times: req.times } });
    await client.close();

    return new Response(null, { status: 204 });
}