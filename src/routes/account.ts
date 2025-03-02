import app from "..";
import User from "../tables/user";

export default function () {
  app.get("/account/api/public/account/:accountid", async (c) => {
    const user = await User.findOne({ accountId: c.req.param("accountid") });
    const body: any = await c.req.parseBody();

    if (!user) {
      return c.json({
        errorCode:
          "errors.com.core.common.authentication.authentication_failed",
        errorMessage:
          "Authentication failed for /api/public/account/:accountId",
        messageVars: ["/api/public/account/:accountId"],
        numericErrorCode: 1032,
        originatingService: "fortnite",
        intent: "prod",
      });
    }

    // if (body.username.includes("@")) {
    //   body.username = body.username.split("@")[0];
    // }

    // if (Bun.env.NO_DB) {
    //   return c.json({
    //     id: body.username,
    //     displayName: body.username,
    //     email: body.username + "@core.xyz",
    //     failedLoginAttempts: 0,
    //     lastLogin: new Date().toISOString(),
    //     numberOfDisplayNameChanges: 3,
    //     ageGroup: "UNKNOWN",
    //     headless: false,
    //     country: "US",
    //     preferredLanguage: "en",
    //     lastDisplayNameChange: "2022-03-29T01:12:43.039Z",
    //     canUpdateDisplayName: false,
    //     tfaEnabled: false,
    //     emailVerified: true,
    //     minorVerified: false,
    //     minorExpected: false,
    //     minorStatus: "NOT_MINOR",
    //     cabinedMode: false,
    //     hasHashedEmail: false,
    //   });
    // }

    return c.json({
      id: user.accountId,
      displayName: user.username,
      email: user.email,
      failedLoginAttempts: 0,
      lastLogin: new Date().toISOString(),
      numberOfDisplayNameChanges: 3,
      ageGroup: "UNKNOWN",
      headless: false,
      country: "US",
      preferredLanguage: "en",
      lastDisplayNameChange: "2022-03-29T01:12:43.039Z",
      canUpdateDisplayName: false,
      tfaEnabled: false,
      emailVerified: true,
      minorVerified: false,
      minorExpected: false,
      minorStatus: "NOT_MINOR",
      cabinedMode: false,
      hasHashedEmail: false,
    });
  });

  app.get("/account/api/public/account", async (c) => {
    var response = [];
    const { accountId } = c.req.queries();
    const body: any = await c.req.parseBody();

    // if (body.username.includes("@")) {
    //   body.username = body.username.split("@")[0];
    // }

    // if (Bun.env.NO_DB) {
    //   response.push({
    //     id: body.username,
    //     displayName: body.username,
    //     externalAuths: {},
    //   });
    // }

    if (typeof accountId == "string") {
      let user = await User.findOne({
        accountId: accountId,
      }).lean();
      if (user) {
        response.push({
          id: user.accountId,
          displayName: user.username,
          externalAuths: {},
        });
      }
    } else if (Array.isArray(accountId)) {
      let users = await User.find({
        accountId: { $in: accountId },
      }).lean();
      if (users) {
        for (let user of users) {
          if (response.length >= 100) break;
          response.push({
            id: user.accountId,
            displayName: user.username,
            externalAuths: {},
          });
        }
      }
    }

    return c.json(response);
  });

  app.get("/account/api/public/account/displayName/:username", async (c) => {
    const username = c.req.param("username");

    const user = await User.findOne({ username: username });
    const body: any = await c.req.parseBody();

    if (!user)
      return c.json({ errorCode: "errors.com.epicgames.common.not_found" });

    // if (body.username.includes("@")) {
    //   body.username = body.username.split("@")[0];
    // }

    // if (Bun.env.NO_DB) {
    //   return c.json({
    //     id: body.username,
    //     displayName: body.username,
    //     externalAuths: {},
    //   });
    // }

    return c.json({
      id: user.accountId,
      displayName: user.username,
      externalAuths: {},
    });
  });

  app.post(
    "/account/api/public/account/:accountId/externalAuths",
    async (c) => {
      return c.json([]);
    }
  );
}
