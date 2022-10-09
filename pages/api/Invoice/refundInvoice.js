// import the necessary node libraries
import fs from "fs";
const AWS = require("aws-sdk");
import puppeteer from "puppeteer";
import handlers from "handlebars";
const nodemailer = require("nodemailer");
import { authentication } from "../../../lib/googleSheet";
import { connectToDatabase } from "../../../lib/mongodb";
let fileUpload = "";
let emailSent = "";
const AWSCredentials = {
  accessKey: process.env.AWSAccessKeyId,
  secret: process.env.AWSSecretKey,
  bucketName: "skillslash-cdn/Refund-Invoice",
};

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  secure: true,
});
export default async function pdfGenerate(req, res) {
  const { db } = await connectToDatabase();
  // extract the customer name from the req.body object
  // and also set a default name with the logical operator

  const {
    customerName,
    courseName,
    customerPhone,
    coursePrice,
    invoiceId,
    salesMan,
    paymentDate,
    customerEmail,
  } = req.body;

  console.log(
    customerName,
    courseName,
    customerPhone,
    coursePrice,
    invoiceId,
    salesMan,
    paymentDate,
    customerEmail
  );

  let GST =
    parseFloat(coursePrice) - parseFloat(coursePrice) * (100 / (100 + 18));

  let OriginalCost = parseFloat(coursePrice) - GST;
  OriginalCost = parseInt(OriginalCost);

  const CGST = parseInt(GST / 2);
  const SGST = parseInt(GST / 2);

  const s3 = new AWS.S3({
    accessKeyId: AWSCredentials.accessKey,
    secretAccessKey: AWSCredentials.secret,
  });
  const { sheets } = await authentication();

  const uploadToS3 = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(`./public/invoice/${fileName}`);

    // Setting up S3 upload parameters
    const params = {
      Bucket: AWSCredentials.bucketName,
      Key: fileName,
      Body: fileContent,
    };

    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
      if (err) {
        throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      fileUpload = `File uploaded successfully. ${data.Location}`;
    });
  };

  GST = parseInt(GST);
  try {
    // read our invoice-template.html file using node fs module
    const file = fs.readFileSync("./invoice-template-backend.html", "utf8");

    // compile the file with handlebars and inject the customerName variable
    const template = handlers.compile(`${file}`);
    const html = template({
      customerName,
      courseName,
      customerPhone,
      coursePrice,
      invoiceId,
      paymentDate,
      customerEmail,
      OriginalCost,
      SGST,
      CGST,
    });

    // simulate a chrome browser with puppeteer and navigate to a new page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const pdfName = customerName + new Date() + "-" + invoiceId;
    const fPdfName = pdfName.replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g, "-");
    console.log(fPdfName);
    const mailData = {
      from: "somanath@skillslash.com",
      to: customerEmail,
      subject: `${courseName} invoice`,
      text: "hello from skillslash",
      attachments: [
        {
          filename: `${fPdfName}.pdf`,
          path: `./public/invoice/${fPdfName}.pdf`,
          contentType: "application/pdf",
        },
      ],
      html: `<div>hello</div><p>Sent from:
           somanath@skillslash.com</p>`,
    };

    // set our compiled html template as the pages content
    // then waitUntil the network is idle to make sure the content has been loaded
    await page.setContent(html, { waitUntil: "networkidle0" });

    // convert the page to pdf with the .pdf() method
    const pdf = await page.pdf({ format: "A4" });
    fs.mkdirSync("./public/invoice", { recursive: true });
    fs.writeFileSync(`./public/invoice/${fPdfName}.pdf`, pdf);

    await browser.close();

    uploadToS3(`${fPdfName}.pdf`);

    transporter.sendMail(mailData, async function (err, info) {
      if (err) {
        emailSent = err.message;
        res.status(200).send({
          fPdfName: fPdfName,
          emailSent: emailSent,
          myPost: myPost,
          fileUpload: fileUpload,
        });
      } else {
        emailSent = `email sent successfully. ${info.messageId}`;
        console.log(info);
        const response = await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: "Sheet2",
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [
              [
                customerName,
                customerEmail,
                paymentDate,
                customerPhone,
                parseInt(coursePrice),
                "backendData",
                "backendData",
                parseInt(GST),
                invoiceId,
                courseName,
                salesMan,
              ],
            ],
          },
        });

        let myPost = await db.collection("generatedInvoice").insertOne({
          customerName: customerName,
          courseName: courseName,
          customerPhone: customerPhone,
          coursePrice: parseFloat(coursePrice),
          invoiceId: invoiceId,
          paymentDate: paymentDate,
          customerEmail: customerEmail,
          pdfName: fPdfName,
          fileLink: fileUpload,
          emailInfo: emailSent,
          salesMan: salesMan,
        });
        res.status(200).json({
          myPost: myPost.insertedId,
          pdfName: fPdfName,
          fileLink: fileUpload,
          emailInfo: emailSent,
        });

        fs.unlinkSync(`./public/invoice/${fPdfName}.pdf`);
      }
    });

    // send the result to the client
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
