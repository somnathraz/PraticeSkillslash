import fs from "fs";
const AWS = require("aws-sdk");
import puppeteer from "puppeteer";
import handlers from "handlebars";
import { connectToDatabase } from "../../../lib/mongodb";
import { authentication } from "../../../lib/googleSheet";

let fileUpload = "";
const AWSCredentials = {
  accessKey: process.env.AWSAccessKeyId,
  secret: process.env.AWSSecretKey,
  bucketName: "skillslash-cdn/Certificate",
};
export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const s3 = new AWS.S3({
    accessKeyId: AWSCredentials.accessKey,
    secretAccessKey: AWSCredentials.secret,
  });
  if (req.method === "POST") {
    const {
      name,
      courseName,
      date,
      certificateType,
      id,
      durationStartDate,
      durationEndDate,
    } = req.body;
    let path = "";
    if (certificateType === "course completion certificate") {
      path = "./certificate/courseCompletion.html";
    }
    if (certificateType === "project experience certificate Theorax") {
      path = "./certificate/projectExperienceCertificateTH.html";
    }
    if (certificateType === "project experience certificate Caspian") {
      path = "./certificate/projectExperienceCertifateCs.html";
    }
    if (certificateType === "Workshop completion certificate") {
      path = "./certificate/workshopCompletion.html";
    }

    const uploadToS3 = async (fileName) => {
      // Read content from the file

      const fileContent = fs.readFileSync(`./public/certificate/${fileName}`);

      // Setting up S3 upload parameters
      const params = {
        Bucket: AWSCredentials.bucketName,
        Key: fileName,
        Body: fileContent,
        ContentDisposition:"inline",
        ContentType:"application/pdf"
      };

      // Uploading files to the bucket
      s3.upload(params, function (err, data) {
        if (err) {
          throw err;
        }

        fileUpload = data.Location;
      });
    };

    const { sheets } = await authentication();

    try {
      // read our invoice-template.html file using node fs module
      console.log(path);
      const file = fs.readFileSync(path, "utf8");

      // compile the file with handlebars and inject the customerName variable
      const template = handlers.compile(`${file}`);
      const html = template({
        name,
        courseName,
        date,
        certificateType,
        id,
        durationStartDate,
        durationEndDate,
      });

      // simulate a chrome browser with puppeteer and navigate to a new page
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const pdfName = name + new Date() + "-" + id;
      const fPdfName = pdfName.replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g, "-");

      // set our compiled html template as the pages content
      // then waitUntil the network is idle to make sure the content has been loaded
      await page.setContent(html, { waitUntil: "networkidle0" });

      // convert the page to pdf with the .pdf() method
      const pdf = await page.pdf({
        width: "1122",
        height: "793",
        printBackground: true,
      });
      fs.mkdirSync("./public/certificate", { recursive: true });
      fs.writeFileSync(`./public/certificate/${fPdfName}.pdf`, pdf);

      await browser.close();

      await uploadToS3(`${fPdfName}.pdf`);
      const downloadFile = `https://skillslash-cdn.s3.ap-south-1.amazonaws.com/Certificate/${fPdfName}.pdf`;
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID1,
        range: "Sheet1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[date, id, name, courseName, certificateType, downloadFile]],
        },
      });

      let myPost = await db.collection("certificateData").insertOne({
        date,
        id,
        name,
        courseName,
        certificateType,
        downloadFile,
      });


      fs.unlinkSync(`./public/certificate/${fPdfName}.pdf`);
      res.status(200).json({
        fileLink: fileUpload,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: error });
    }
  }
}
