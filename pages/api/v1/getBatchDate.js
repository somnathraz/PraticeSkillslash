import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === "POST") {
    let id = "";
    if (req.body === "Adv Data Science and AI") {
      id = "FAIML";
    }
    if (req.body === "Full Stack Developer course with certification") {
      id = "FSD";
    }
    if (req.body === "Blockchain program and certification") {
      id = "BLC";
    }
    if (req.body === "Business Analytics Program For Professionals") {
      id = "BLC";
    }
    if (req.body === "Data Structures and Algorithms + System Design") {
      id = "DSA";
    }
    if (req.body === "Full stack web development course") {
      id = "WEB";
    }
    try {
      const batchDate = await db.collection("batchDate").findOne({
        id,
      });
      console.log(batchDate);
      //   let myPost = await db
      //     .collection("batchDate")
      //     .find()
      //     .forEach(function (item) {
      //       batchDate.push(item);
      //     });
      res.status(200).json({ batchDate, msg: "BatchDate" });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
