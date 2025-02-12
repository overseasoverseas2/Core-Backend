import app from "..";
import fs from "fs";
import path from "path";

export default function () {
  app.get("/fortnite/api/storefront/v2/keychain", async (c) => {
    const keychain = await JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../local/storefront/keychain.json"),
        "utf-8"
      )
    );
    return c.json(keychain);
  });

  app.get("/fortnite/api/storefront/v2/catalog", async (c) => {
    const catalog = await JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../local/storefront/catalog.json"),
        "utf-8"
      )
    );
    return c.json(catalog);
  });
}
