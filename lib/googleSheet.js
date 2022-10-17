import { google } from "googleapis";

const DRIVE_CLIENT_ID = process.env.DRIVE_CLIENT_ID;
const DRIVE_CLIENT_SECRET = process.env.DRIVE_CLIENT_SECRET;
const DRIVE_REDIRECT_URI = process.env.DRIVE_REDIRECT_URI;

const REFRESH_TOKEN = process.env.DRIVE_REFRESH_TOKEN;

const driveOAuth = new google.auth.OAuth2(
  DRIVE_CLIENT_ID,
  DRIVE_CLIENT_SECRET,
  DRIVE_REDIRECT_URI
);

driveOAuth.setCredentials({ refresh_token: REFRESH_TOKEN });

export const driveAuth = async () => {
  const drive = google.drive({
    version: "v3",
    auth: driveOAuth,
  });
  return drive;
};

export const authentication = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });
  return { sheets };
};
