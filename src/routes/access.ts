import app from "..";

export default function () {
  app.get("/fortnite/api/v2/versioncheck/Windows", async (c) => {
    return c.json({
      type: "NO_UPDATE",
    });
  });

  app.post(
    "/fortnite/api/game/v2/tryPlayOnPlatform/account/:accountId",
    async (c) => {
      c.header("Content-Type", "text/plain");
      return c.text("true");
    }
  );

  app.get("/fortnite/api/game/v2/enabled_features", async (c) => {
    return c.json({});
  });

  app.post("/fortnite/api/game/v2/grant_access/*", async (c) => {
    return c.json({});
  });

  app.get("/fortnite/api/entitlementCheck", async (c) => {
    c.status(204);
    return c.json([]);
  });

  app.get("/waitingroom/api/waitingroom", async (c) => {
    c.status(204);
    return c.json([]);
  });

  app.post("/datarouter/api/v1/public/data", async (c) => {
    c.status(204);
    return c.json([]);
  });
}
