// import the necessary node libraries
import fs from "fs";
const AWS = require("aws-sdk");
import puppeteer from "puppeteer";
import handlers from "handlebars";
const nodemailer = require("nodemailer");
import { connectToDatabase } from "../../../lib/mongodb";
let fileUpload = "";
let emailSent = "";
const AWSCredentials = {
  accessKey: process.env.AWSAccessKeyId,
  secret: process.env.AWSSecretKey,
  bucketName: "skillslash-cdn/generatead-invoice",
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
  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    // extract the customer name from the req.body object
    // and also set a default name with the logical operator

    const {
      customerName,
      courseName,
      customerPhone,
      coursePrice,
      invoiceId,

      paymentDate,
      customerEmail,
    } = req.body;

    console.log(
      customerName + "customerName\n",
      courseName + "courseName\n",
      customerPhone + "customerPhone\n",
      coursePrice + "coursePrice\n",
      invoiceId + "invoice ID \n",
      paymentDate + "payment Date\n",
      customerEmail + "customerEmail\n",
      "generateInvoiceAPI"
    );

    const s3 = new AWS.S3({
      accessKeyId: AWSCredentials.accessKey,
      secretAccessKey: AWSCredentials.secret,
    });

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

        fileUpload = `File uploaded successfully. ${data.Location}`;
      });
    };

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
      console.log(pdf);
      uploadToS3(`${fPdfName}.pdf`);
      let myPost = await db.collection("generatedInvoice").insertOne(req.body);

      transporter.sendMail(mailData, function (err, info) {
        if (err) {
          console.log(err);
          emailSent = err.message;
          res.status(200).send({
            fPdfName: fPdfName,
            emailSent: emailSent,
            myPost: myPost,
            fileUpload: fileUpload,
          });
        } else {
          console.log(info);
          emailSent = `email sent successfully. ${info.messageId}`;
          res.status(200).send({
            fPdfName: fPdfName,
            emailSent: emailSent,
            myPost: myPost.insertedId,
            fileUpload: fileUpload,
          });
          fs.unlinkSync(`./public/invoice/${fPdfName}.pdf`);
        }
      });

      // send the result to the client
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(200).json({ name: "hello" });
  }
}
