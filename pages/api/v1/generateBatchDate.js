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
    let batchId = "";

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

    if (page === "Adv Data Science and AI") {
      id = "FAIML";
      batchId = id + batchDate + batchMonth;
      // console.log(batchId);
    }
    if (page === "Full Stack Developer course with certification") {
      id = "FSD";
      batchId = id + batchDate + batchMonth;
    }
    if (page === "Blockchain program and certification") {
      id = "BLC";
      batchId = id + batchDate + batchMonth;
    }
    if (page === "Business Analytics Program For Professionals") {
      id = "BAP";
      batchId = id + batchDate + batchMonth;
    }
    if (page === "Data Structures and Algorithms + System Design") {
      id = "DSA";
      batchId = id + batchDate + batchMonth;
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
                batchId: batchId,
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
              batchId: batchId,
              batchDate: batchDate,
              batchMonth: batchMonth.toUpperCase(),
              batchStatus: batchStatus,
              batchType: batchType,
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
      const batchDatesDetails = [];

      let myPost = await db
        .collection("batchDate")
        .find()
        .forEach(function (item) {
          batchDatesDetails.push(item);
        });

      res.status(200).json({ batchDatesDetails, msg: "BatchDate" });
    } catch (error) {}
  }

  // if(req.method === "DELETE"){

  //   const {id} = req.body;
  //   try {
  //     const findBatch = await db.collection("batchDate").findOne({
  //       batchId:id.batchId,
  //     });
  //     console.log(findBatch,"hello");
  //     // if(findBatch){
  //     //   const deleteBatch = await db.collection("batchDate").updateMany({ batchId:id},{ $pull: {
  //     //     batchDetails: id
  //     // }})
  //     // }
  //     // console.log(findBatch);
  //     res.status(200).send("hello")
  //   } catch (error) {
  //     res.status(200).send(error)
  //   }
  // }
}
