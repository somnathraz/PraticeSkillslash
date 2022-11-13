import { connectToDatabase } from "../../../lib/mongodb";

function getMonthShortName(monthNo) {
  const date = new Date();
  date.setMonth(monthNo);

  return date.toLocaleString("en-US", { month: "short" });
}

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  if (req.method === "POST") {
    const idArray = [];
    const {
      batchDates,
      batchType,
      batchStatus,
      page,
      batchWeek,
      batchDesc1,
      batchDesc2,
    } = req.body;
    const batchDate = new Date(batchDates).getDate();
    const batchMonth = getMonthShortName(new Date(batchDates).getMonth());

    page.map((pageName, i) => {
      if (pageName === "Adv Data Science and AI") {
        idArray.push("FAIML");
      }
      if (pageName === "Full Stack Developer course with certification") {
        idArray.push("FSD");
      }
      if (pageName === "Blockchain program and certification") {
        idArray.push("BLC");
      }
      if (pageName === "Business Analytics Program For Professionals") {
        idArray.push("BLC");
      }
      if (pageName === "Data Structures and Algorithms + System Design") {
        idArray.push("DSA");
      }
    });
    let id = Array.from(new Set(idArray));
    try {
      const checkForId = await db.collection("batchDate").findOne({
        id,
      });
      if (checkForId) {
      } else {
        const CreateBatch = await db.collection("batchDate").insertOne({
          id,
          batchDetails: [
            {
              batchDate: "11",
              batchMonth: "NOV",
              batchStatus: batchStatus,
              batchType: "Evening Batch, ",
              batchTime: "08:00 to 10:00",
              batchDesc:
                "Enrollment for this batch will be closed by today 11 PM",
              batchWeek: "weekday batch (Mon - Fri)",
              batchMsg: "Seats are almost filled",
              activeBatch: true,
            },
          ],
        });
      }
    } catch (error) {}
  }

  console.log(req.body);
  res.send("hello");
}
