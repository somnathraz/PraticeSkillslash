import { connectToDatabase } from "../../../lib/mongodb";

function getMonthShortName(monthNo) {
  const date = new Date();
  date.setMonth(monthNo);

  return date.toLocaleString("en-US", { month: "short" });
}

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  if (req.method === "POST") {
    let id = "";

    const {
      batchDates,
      batchType,
      batchStatus,
      batchStartTime,
      batchEndTime,
      page,
      batchWeek,
      batchDesc1,
      batchDesc2,
      activeBatch,
    } = req.body;

    const batchDate = new Date(batchDates).getDate();
    const batchMonth = getMonthShortName(new Date(batchDates).getMonth());
    const addDate = new Date(batchDates);
    addDate.setDate(addDate.getDate() + 1);
    console.log(addDate);
    if (page === "Adv Data Science and AI") {
      id = "FAIML";
    }
    if (page === "Full Stack Developer course with certification") {
      id = "FSD";
    }
    if (page === "Blockchain program and certification") {
      id = "BLC";
    }
    if (page === "Business Analytics Program For Professionals") {
      id = "BAP";
    }
    if (page === "Data Structures and Algorithms + System Design") {
      id = "DSA";
    }

    try {
      const checkForId = await db.collection("batchDate").findOne({
        id,
      });
      if (checkForId) {
        const updateBatch = await db.collection("batchDate").updateOne(
          {
            id: id,
          },
          {
            $push: {
              batchDetails: {
                batchDate: batchDate,
                batchMonth: batchMonth.toUpperCase(),
                batchStatus: batchStatus,
                batchType: batchType,
                batchStartTime: new Date(batchStartTime).toLocaleTimeString(
                  [],
                  { hour: "2-digit", minute: "2-digit" }
                ),
                batchEndTime: new Date(batchEndTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                batchDesc: batchDesc1,
                batchWeek: batchWeek,
                batchMsg: batchDesc2,
                activeBatch: activeBatch,
                expireAt: addDate,
              },
            },
          }
        );
        await db
          .collection("batchDate")
          .createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });
        res.send("hello");
      } else {
        const CreateBatch = await db.collection("batchDate").insertOne({
          id,
          batchDetails: [
            {
              batchDate: batchDate,
              batchMonth: batchMonth.toUpperCase(),
              batchStatus: batchStatus,
              batchType: batchType + ",",
              batchStartTime: new Date(batchStartTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              batchEndTime: new Date(batchEndTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              batchDesc: batchDesc1,
              batchWeek: batchWeek,
              batchMsg: batchDesc2,
              activeBatch: activeBatch,
              expireAt: addDate,
            },
          ],
        });
        await db
          .collection("batchDate")
          .createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });
        res.send("hello");
      }
    } catch (error) {}
  }
  if (req.method === "GET") {
    try {
      const batchDates = [];

      let myPost = await db
        .collection("batchDate")
        .find()
        .forEach(function (item) {
          batchDates.push(item);
        });

      res.status(200).json({ batchDates, msg: "BatchDate" });
    } catch (error) {}
  }
}
