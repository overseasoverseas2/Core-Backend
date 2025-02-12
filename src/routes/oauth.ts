import app from "..";
import { v4 } from "uuid";
import User from "../tables/user";
import { sign } from "hono/jwt";

export default function () {
  app.post("/account/api/oauth/token", async (c) => {
    const body = await c.req.parseBody();
    const user = await User.findOne({ email: body.username });
    const { grant_type } = body;
    const id = v4();

    // will add proper errors later
    if (!user && grant_type !== "client_credentials")
      return c.json({ error: "User not Found!" });
    if (!body) return c.json({ error: "Invalid Body" });
    if (user?.banned) return c.json({ error: "User is banned" }, 404);

    const created = new Date(user?.created ?? Date.now());

    if (grant_type === "client_credentials") {
      let access = await sign({ id }, "Core");

      return c.json({
        access_token: access,
        expires_in: 28800,
        expires_at: "9999-12-02T01:12:01.100Z",
        token_type: "bearer",
        client_id: id,
        internal_client: true,
        client_service: "fortnite",
      });
    } else if (grant_type === "password") {
      const { password } = body;

      if (
        !user?.password ||
        !(await Bun.password.verify(password as string, user.password))
      )
        return c.json({ error: "Incorrect Password!" });

      let access = await sign(
        {
          email: body.username,
          password: password,
          type: "access",
        },
        "Core"
      );

      let refresh = await sign(
        {
          email: body.username,
          password: password,
          type: "refresh",
        },
        "Core"
      );

      return c.json({
        access_token: access,
        expires_in: 28800,
        expires_at: "9999-12-02T01:12:01.100Z",
        token_type: "bearer",
        refresh_token: refresh,
        refresh_expires: 28800,
        refresh_expires_at: "9999-12-02T01:12:01.100Z",
        account_id: user?.accountId,
        client_id: id,
        internal_client: true,
        client_service: "fortnite",
        displayName: user?.username,
        app: "fortnite",
        in_app_id: user?.accountId,
        device_id: id,
      });
    } else if (grant_type === "refresh_token") {
      let access = await sign(
        {
          email: body.username,
          password: body.password,
          type: "access",
        },
        "Secret"
      );

      let refresh = await sign(
        {
          email: body.username,
          password: body.password,
          type: "refresh",
        },
        "Secret"
      );

      return c.json({
        access_token: access,
        expires_in: 28800,
        expires_at: "9999-12-02T01:12:01.100Z",
        token_type: "bearer",
        refresh_token: refresh,
        refresh_expires: 28800,
        refresh_expires_at: "9999-12-31T23:59:59.999Z",
        account_id: user?.accountId,
        client_id: id,
        internal_client: true,
        client_service: "fortnite",
        displayName: user?.username,
        app: "fortnite",
        in_app_id: user?.accountId,
        device_id: id,
      });
    }
  });

  app.delete("/account/api/oauth/sessions/kill", async (c) => {
    c.status(204);
    return c.json({});
  });

  app.get("/account/api/oauth/verify", async (c) => {
    const Id = v4();
    let token = c.req.header("authorization")?.replace("bearer ", "");

    return c.json({
      token: token,
      account_id: c.req.param("accountId"),
      client_id: Id,
      internal_client: true,
      client_service: "fortnite",
      expires_in: 28800,
      expires_at: "9999-12-02T01:12:01.100Z",
      app: "fortnite",
      auth_method: "password",
      device_id: Id,
      displayName: c.req.param("username"),
      in_app_id: c.req.param("accountId"),
    });
  });
}
