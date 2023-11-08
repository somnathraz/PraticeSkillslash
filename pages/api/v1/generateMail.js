import { connectToDatabase } from "../../../lib/mongodb";
const nodemailer = require("nodemailer");
export default async function generateMail(req, res) {
  const { db } = await connectToDatabase();

  try {
    let allEmail = await db.collection("newsletter").find().toArray();
    console.log(allEmail[0].email);

    console.log(
      process.env.SMTP_NewsUSERNAME,
      process.env.SMTP_NewsMAILPass,
      "username"
    );

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_NewsUSERNAME,
        pass: process.env.SMTP_NewsMAILPass,
      },
    });

    // Send the email
    transporter.sendMail(
      {
        from: "news@skillslash.com",
        to: "news@skillslash.com",
        subject: "Thank you for Subscribing to Skillslash Newsletter!",
        text: "",
        html: `<div>
        <div style="background-color: #f6f6f6; padding: 50px 50px; width: 86%;">
         <div style="background-color: white; padding: 50px 60px; border-radius: 10px">
         <img src="https://skillslash-cdn.s3.ap-south-1.amazonaws.com/static/blog/5-health-care-real-time-projects-to-get-hired-at-2023.jpeg" style="width: 49%; height:30% "/>
        <p><strong>Dear</strong>,</p>
                     <p>We hope this message finds you well. On behalf of the Skillslash team, we extend our heartfelt gratitude for subscribing to our newsletter. By subscribing, you have joined a community of like-minded individuals who share a passion for data science. We look forward to sharing our knowledge and expertise with you by dedicatedly curating high-quality content (articles, webinars, tutorials) and much more. </p>

                     <p>Should you ever have any questions, feedback, or suggestions, please do not hesitate to reach out to us at info@skillslash.com / 083919 11911 .
                     Your input is invaluable in helping us improve and tailor our content to better serve your needs.</p>

                     <p>Once again, thank you for choosing Skillslash as your source for data science insights. We're excited to have you on board, and we look forward to a fruitful and enriching journey together.</p>

                     <p> If you do not want to receive emails like these anymore, you can <a href="${`http://localhost:3000/unsubscribe?email}`}">unsubscribe</a>.</p>

                     <p>Best regards</p></div></div></div>`,
      },
      function (err, info) {
        if (err) {
          console.log(err);
          res.status(500).json({ error: err.message });
        } else {
          console.log(`Email sent successfully. ${info.messageId}`);
          res.status(200).json({ msg: "email added and sent", status: 200 });
        }
      }
    );

    res.status(200).json({
      allEmail: allEmail[0].email,
      msg: "all email here",
      status: 200,
    });
    console.log(allEmail, "emailData");
  } catch (error) {
    console.log(error);
  }
}
