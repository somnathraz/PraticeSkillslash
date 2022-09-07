import clientPromise from "../../../lib/mongodb";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("skillslash");
  switch (req.method) {
    case "POST":
      let bodyObject = req.body;

      console.log(bodyObject);
      let myPost = await db
        .collection("users")
        .find({ _id: `ObjectId("63159dead2101f2b7e996efa")` });
      res.json(myPost);

      client.close();
      break;
    case "GET":
      const allPosts = await db
        .collection("users")
        .findOne({ _id: `ObjectId("63159dead2101f2b7e996efa")` });
      res.json({ status: 200, data: allPosts });
      if (!allPosts) {
        res.status(404).json({ msg: "no user found" });
      }
      break;
  }
}
