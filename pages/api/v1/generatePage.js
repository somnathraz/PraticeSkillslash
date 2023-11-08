import { google } from "googleapis";
import fs from "fs";
const DRIVE_CLIENT_ID = process.env.DRIVE_CLIENT_ID;
const DRIVE_CLIENT_SECRET = process.env.DRIVE_CLIENT_SECRET;
const DRIVE_REDIRECT_URI = process.env.DRIVE_REDIRECT_URI;

const REFRESH_TOKEN =
  "1//04KD4Tr-ma6eRCgYIARAAGAQSNwF-L9Ir0J2BQ4j32SsrubLVelDlr9etyU2eBiuC_f1PAMdm2MoyU8dz0WZdBoWc8sDMz6l-In4";

const driveOAuth = new google.auth.OAuth2(
  DRIVE_CLIENT_ID,
  DRIVE_CLIENT_SECRET,
  DRIVE_REDIRECT_URI
);

driveOAuth.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: driveOAuth,
});

export default async function generatePage(req, res) {
  const files = [];
  const pages = [];
  try {
    const response = await drive.files.list({
      q: "'1wkWq1JFO5bLFfll7NUkiZYtI7C_0MDyO' in parents",
      fields: "nextPageToken, files(id, name)",
      spaces: "drive",
    });

    Array.prototype.push.apply(files, response.files);
    response.data.files.forEach(function (file) {
      // console.log(file.name);
      fs.mkdirSync(`./pages/tutor/${file.name}`, { recursive: true });
      fs.mkdirSync(`./tutor/${file.name}`, { recursive: true });
      //create files inside folder

      const readLibFile = fs.readFileSync("./libFile.txt", "utf8");
      const replaceLibFile = readLibFile.replace(
        /"content"/gi,
        `"/tutor/${file.name}"`
      );
      fs.writeFileSync(`./lib/${file.name.trim()}Page.js`, replaceLibFile, {
        encoding: "utf8",
      });

      const libPage = `${file.name.trim()}Page`;

      const readFile = fs.readFileSync("./demoPage.txt", "utf8");
      const replaced = readFile.replace(
        /import { getAllPostIds, getPostData } from \"..\/..\/..\/lib\/tutorPage"/gi,
        `import { getAllPostIds, getPostData } from "../../../lib/${libPage}"`
      );

      // Creating new file - paste.txt with file.txt's content
      fs.writeFileSync(`./pages/tutor/${file.name}/[id].js`, replaced, {
        encoding: "utf8",
      });

      const writeFiles = async () => {
        const fileResponse = await drive.files.list({
          q: `'${file.id}' in parents`,
          fields: "nextPageToken, files(id, name)",
          spaces: "drive",
        });
        Array.prototype.push.apply(pages, fileResponse.files);
        const downloadFile = async (fileID) => {
          const DownloadFile = await drive.files.get({
            fileId: fileID,
            alt: "media",
          });

          return DownloadFile.data;
        };
        fileResponse.data.files.forEach(function (page) {
          let downloadPageData;
          const downloadFullFile = async () => {
            downloadPageData = await downloadFile(page.id);

            const jsonObjectDownloadPageData = JSON.stringify(downloadPageData);

            fs.writeFileSync(
              `./tutor/${file.name}/${page.name}`,
              jsonObjectDownloadPageData,
              {
                encoding: "utf8",
              }
            );
          };
          downloadFullFile();
        });
      };
      writeFiles();
    });

    res.status(200).json({ file: files });
  } catch (err) {
    throw err;
  }
}
