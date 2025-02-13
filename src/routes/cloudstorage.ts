import app from "..";
import crypto from "crypto";
import path from "node:path";
import fs from "fs";

const allowedFileNames: string[] = [
  "defaultgame.ini",
  "defaultengine.ini",
  "defaultruntimeoptions.ini",
  "defaultinput.ini",
];

function Allowed(string: string): boolean {
  for (let i = 0; i < allowedFileNames.length; i++) {
    const currentFileName = allowedFileNames[i];
    if (string.toLowerCase() === currentFileName) {
      return true;
    }
  }

  return false;
}

export default function () {
  app.get("/fortnite/api/cloudstorage/system", async (c) => {
    try {
      const hotfixesDir = path.join(__dirname, "../../static/hotfixes");
      const csFiles: any = [];

      fs.readdirSync(hotfixesDir).forEach((file) => {
        const filePath = path.join(hotfixesDir, file);
        const f = fs.readFileSync(filePath);
        const fileStat = fs.statSync(filePath);

        csFiles.push({
          uniqueFilename: file,
          filename: file,
          hash: crypto
            .createHash("sha1")
            .update(new Uint8Array(f))
            .digest("hex"),
          hash256: crypto
            .createHash("sha256")
            .update(new Uint8Array(f))
            .digest("hex"),
          length: fileStat.size,
          contentType: "application/octet-stream",
          uploaded: new Date().toISOString(),
          storageType: "S3",
          storageIds: {},
          doNotCache: true,
        });
      });

      return c.json(csFiles);
    } catch (err) {
      console.error("Error fetching system cloudstorage:", err);
      return c.status(500);
    }
  });

  app.get("/fortnite/api/cloudstorage/system/config", async (c) => {
    try {
      const hotfixesDir = path.join(__dirname, "../../static/hotfixes");
      const csFiles: any = [];

      fs.readdirSync(hotfixesDir).forEach((file) => {
        const filePath = path.join(hotfixesDir, file);
        const f = fs.readFileSync(filePath);
        const fileStat = fs.statSync(filePath);

        csFiles.push({
          uniqueFilename: file,
          filename: file,
          hash: crypto
            .createHash("sha1")
            .update(new Uint8Array(f))
            .digest("hex"),
          hash256: crypto
            .createHash("sha256")
            .update(new Uint8Array(f))
            .digest("hex"),
          length: fileStat.size,
          contentType: "application/octet-stream",
          uploaded: new Date().toISOString(),
          storageType: "S3",
          storageIds: {},
          doNotCache: true,
        });
      });

      return c.json(csFiles);
    } catch (err) {
      console.error("Error fetching system config cloudstorage:", err);
      return c.status(500);
    }
  });

  app.get("/fortnite/api/cloudstorage/system/:file", async (c) => {
    try {
      const filePath = path.join(
        __dirname,
        "../../static/hotfixes",
        c.req.param("file")
      );
      let fileContent = fs.readFileSync(filePath, { encoding: "utf8" });

      const fileName = c.req.param("file");

      if (Allowed(fileName.toLowerCase()) == false) {
        return c.text("dumbass", 404);
      }

      return c.text(fileContent);
    } catch (err) {
      console.error("Error fetching system file:", err);
      return c.notFound();
    }
  });
}
