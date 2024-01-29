import fs from "fs";
const AWS = require("aws-sdk");
import puppeteer from "puppeteer";
import handlers from "handlebars";
const nodemailer = require("nodemailer");
import { connectToDatabase } from "../../../lib/mongodb";
import { authentication } from "../../../lib/googleSheet";

let fileUpload = "";
let emailSent = "";
const AWSCredentials = {
  accessKey: process.env.AWSAccessKeyId,
  secret: process.env.AWSSecretKey,
  bucketName: "skillslash-cdn/Certificate",
};
const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.SMTP_MAILID,
    pass: process.env.SMTP_MAILPASS,
  },
  secure: true,
});
export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const s3 = new AWS.S3({
    accessKeyId: AWSCredentials.accessKey,
    secretAccessKey: AWSCredentials.secret,
  });
  if (req.method === "POST") {
    const {
      name,
      email,
      courseName,
      date,
      certificateType,
      id,
      durationStartDate,
      durationEndDate,
      textarea,
      vertical,
      point,
    } = req.body;
    // console.log(req.body);

    // console.log(req.body);
    let path = "";
    if (certificateType === "course completion certificate") {
      path = "./certificate/courseCompletion.html";
    }
    if (certificateType === "CHMS-vertical") {
      path = "./certificate/CHMS-vertical.html";
    }
    if (certificateType === "project experience certificate Theorax") {
      path = "./certificate/projectExperienceCertificateTH.html";
    }
    if (certificateType === "project experience certificate Caspian") {
      path = "./certificate/projectExperienceCertifateCs.html";
    }
    if (certificateType === "project experience certificate SingleDoor") {
      path = "./certificate/projectExperienceCertifateCsSingleDoor.html";
    }
    if (certificateType === "Workshop completion certificate") {
      path = "./certificate/workshopCompletion.html";
    }
    if (certificateType === "Module completion certificate") {
      path = "./certificate/moduleCompeletionCertificate.html";
    }
    if (certificateType === "project experience certificate CHMS") {
      path = "./certificate/projectExperienceCertifateChms.html";
    }
    if (certificateType === "SingleDoor Project Completion") {
      path = "./certificate/singleDoor.html";
    }

    const uploadToS3 = async (fileName) => {
      // Read content from the file

      const fileContent = fs.readFileSync(`./public/certificate/${fileName}`);

      // Setting up S3 upload parameters
      const params = {
        Bucket: AWSCredentials.bucketName,
        Key: fileName,
        Body: fileContent,
        ContentDisposition: "inline",
        ContentType: "application/pdf",
      };

      // Uploading files to the bucket
      s3.upload(params, function (err, data) {
        if (err) {
          throw err;
        }

        fileUpload = data.Location;
      });
    };
    const certPoint = point.split("pointbreak");
    // console.log(certPoint, "array");

    const { sheets } = await authentication();

    try {
      // read our invoice-template.html file using node fs module

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
        textarea,
        certPoint,
      });

      // simulate a chrome browser with puppeteer and navigate to a new page
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const pdfName = name + new Date() + "-" + id;
      const fPdfName = pdfName.replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g, "-");

      // set our compiled html template as the pages content
      // then waitUntil the network is idle to make sure the content has been loaded
      await page.setContent(html, { waitUntil: "networkidle0" });
      //MAIL DATA

      // convert the page to pdf with the .pdf() method
      // const pdf = await page.pdf({
      //   width: "1122",
      //   height: "793",
      //   printBackground: true,
      // });

      let pdf;
      if (vertical) {
        pdf = await page.pdf({
          width: "980", // set width to A4 width
          height: "1130",
          printBackground: true,
        });
      } else {
        pdf = await page.pdf({
          width: "1122",
          height: "793",
          printBackground: true,
        });
      }
      fs.mkdirSync("./public/certificate", { recursive: true });
      fs.writeFileSync(`./public/certificate/${fPdfName}.pdf`, pdf);

      await browser.close();
      let mailData;

      if (certificateType === "course completion certificate") {
        mailData = {
          from: "certificate@skillslash.com",
          to: email,
          cc: "phani.kishore@skillslash.com",
          subject: `certificate From Skillslash`,
          attachments: [
            {
              filename: `${fPdfName}.pdf`,
              path: `./public/certificate/${fPdfName}.pdf`,
              contentType: "application/pdf",
            },
          ],
          html: `<div>Hi ${name},</div><p>Congratulations!,</p> <p>Here is your certificate of completion of the ${courseName}</p></div><p> A Module by Skillslash Academy! Congratulations on receiving your certificate of completion! </p> <p>You can now download your certificate.</p><p>Please see the attached file for your certificate.</p><div>Thanks and Regards</div><div>Team Skillslash</div>`,
        };
      }
      if (certificateType === "Module completion certificate") {
        mailData = {
          from: "certificate@skillslash.com",
          to: email,
          cc: "phani.kishore@skillslash.com",
          subject: `certificate From Skillslash`,
          attachments: [
            {
              filename: `${fPdfName}.pdf`,
              path: `./public/certificate/${fPdfName}.pdf`,
              contentType: "application/pdf",
            },
          ],
          html: `<div>Hi ${name},</div><p>Congratulations!,</p> <p>Here is your certificate of completion of the ${courseName}</p></div><p> A course by Skillslash Academy! Congratulations on receiving your certificate of completion! </p> <p>You can now download your certificate.</p><p>Please see the attached file for your certificate.</p><div>Thanks and Regards</div><div>Team Skillslash</div>`,
        };
      }
      if (
        certificateType === "project experience certificate Theorax" ||
        certificateType === "project experience certificate Caspian" ||
        certificateType === "project experience certificate SingleDoor" ||
        certificateType === "project experience certificate CHMS"
      ) {
        mailData = {
          from: "certificate@skillslash.com",
          to: email,
          cc: "phani.kishore@skillslash.com",
          subject: `certificate From Skillslash`,
          attachments: [
            {
              filename: `${fPdfName}.pdf`,
              path: `./public/certificate/${fPdfName}.pdf`,
              contentType: "application/pdf",
            },
          ],
          html: `<div>Hi ${name},</div><p>Congratulations!,</p> <p>Here is your certificate of completion of the Project ${courseName}</p></div><p> Congratulations on receiving your certificate of completion! </p> <p>You can now download your certificate.</p><p>Please see the attached file for your certificate.</p><div>Thanks and Regards</div><div>Team Skillslash</div>`,
        };
      }
      if (certificateType === "Workshop completion certificate") {
        mailData = {
          from: "certificate@skillslash.com",
          to: email,
          cc: "phani.kishore@skillslash.com",
          subject: `certificate From Skillslash`,
          attachments: [
            {
              filename: `${fPdfName}.pdf`,
              path: `./public/certificate/${fPdfName}.pdf`,
              contentType: "application/pdf",
            },
          ],
          html: `<div>Dear ${name},</div><p>Congratulations!,</p> <p>Here is your certificate for ${courseName} by Skillslash Academy !</p></div><p>Congratulations on receiving your ${courseName}! You can now download your certificate.</p> <p>Your certificate is available in an online format so that you can retrieve it anywhere at any time, and easily share the details of your achievement.</p><p>Having trouble with your certificate or you want to unsubscribe from email list? Contact us at info@skillslash.com.</p>`,
        };
      }
      // singledoor project completition
      if (
        certificateType === "SingleDoor Project Completion" ||
        certificateType === "CHMS-vertical"
      ) {
        mailData = {
          from: "certificate@skillslash.com",
          to: email,
          cc: "phani.kishore@skillslash.com",
          subject: `certificate From Skillslash`,
          attachments: [
            {
              filename: `${fPdfName}.pdf`,
              path: `./public/certificate/${fPdfName}.pdf`,
              contentType: "application/pdf",
            },
          ],
          html: `<div>This is to certify that ${name} was engaged in a
              ${courseName} by Single Door Pvt Ltd.
              This certificate is awarded in recognition of your exceptional
              contributions to the project.</div>
              <div>${textarea}</div>`,
        };
      }

      await uploadToS3(`${fPdfName}.pdf`);
      transporter.sendMail(mailData, async function (err, info) {
        if (err) {
          console.log(err);
          emailSent = err.message;
          res.status(200).send({
            fPdfName: fPdfName,
            emailSent: emailSent,
            fileUpload: fileUpload,
          });
        } else {
          emailSent = `email sent successfully. ${info.messageId}`;

          const downloadFile = `https://skillslash-cdn.s3.ap-south-1.amazonaws.com/Certificate/${fPdfName}.pdf`;
          const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID1,
            range: "Sheet1",
            valueInputOption: "USER_ENTERED",
            requestBody: {
              values: [
                [date, id, name, courseName, certificateType, downloadFile],
              ],
            },
          });
          if (
            certificateType === "project experience certificate Theorax" ||
            certificateType === "project experience certificate Caspian"
          ) {
            const response = await sheets.spreadsheets.values.append({
              spreadsheetId: process.env.GOOGLE_SHEET_ID1,
              range: "project certification",
              valueInputOption: "USER_ENTERED",
              requestBody: {
                values: [
                  [date, id, name, courseName, certificateType, downloadFile],
                ],
              },
            });
          }
          if (
            certificateType === "course completion certificate" ||
            certificateType === "Module completion certificate"
          ) {
            const response = await sheets.spreadsheets.values.append({
              spreadsheetId: process.env.GOOGLE_SHEET_ID1,
              range: "course certification",
              valueInputOption: "USER_ENTERED",
              requestBody: {
                values: [
                  [date, id, name, courseName, certificateType, downloadFile],
                ],
              },
            });
          }
          if (certificateType === "Workshop completion certificate") {
            const response = await sheets.spreadsheets.values.append({
              spreadsheetId: process.env.GOOGLE_SHEET_ID1,
              range: "Workshop certification",
              valueInputOption: "USER_ENTERED",
              requestBody: {
                values: [
                  [date, id, name, courseName, certificateType, downloadFile],
                ],
              },
            });
          }
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
        }
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: error });
    }
  }
}
