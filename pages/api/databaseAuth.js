import clientPromise from "../../lib/mongodb";
export default async function handler(req, res) {
  console.log(req.body);
  const client = await clientPromise;
  const db = client.db("skillslash");
  switch (req.method) {
    case "POST":
      let bodyObject = req.body;

      let myPost = await db.collection("payment").insertOne(bodyObject);
      res.json(myPost);
      client.close();
      break;
    case "GET":
      const allPosts = await db.collection("payment").find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
}
