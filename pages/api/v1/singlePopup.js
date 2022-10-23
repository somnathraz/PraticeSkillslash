import { connectToDatabase } from "../../../lib/mongodb";
export default async function generatePage(req, res) {
  const { db } = await connectToDatabase();
  if (req.method === "POST") {
    const { id } = req.body;
    console.log(id);
    try {
      let myPost = await db.collection("popup").findOne({
        id: id,
      });

      res.status(200).json({ myPost, msg: "popup send" });
    } catch (error) {
      res.status(500).json({ error, msg: "error" });
    }
  }
}
