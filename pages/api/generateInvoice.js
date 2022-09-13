// import the necessary node libraries
import fs from "fs";
import puppeteer from "puppeteer";
import handlers from "handlebars";

export default async function pdfGenerate(req, res) {
  // extract the customer name from the req.body object
  // and also set a default name with the logical operator
  console.log(req.body);
  const { name } = req.body;

  try {
    // read our invoice-template.html file using node fs module
    const file = fs.readFileSync("./invoice-template.html", "utf8");

    // compile the file with handlebars and inject the customerName variable
    const template = handlers.compile(`${file}`);
    const html = template({ name });

    // simulate a chrome browser with puppeteer and navigate to a new page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // set our compiled html template as the pages content
    // then waitUntil the network is idle to make sure the content has been loaded
    await page.setContent(html, { waitUntil: "networkidle0" });

    // convert the page to pdf with the .pdf() method
    const pdf = await page.pdf({ format: "A4" });
    fs.mkdirSync("./public/invoice", { recursive: true });
    fs.writeFileSync("./public/invoice/invoice.pdf", pdf);

    await browser.close();
    console.log(pdf);

    // send the result to the client
    res.statusCode = 200;
    res.send(pdf);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}
