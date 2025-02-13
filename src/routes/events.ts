import app from "..";
import User from "../tables/user";
import path from "path";
import { Arena } from "../utilities/createArena";

export default function () {
  app.get("/api/v1/events/Fortnite/download/:accountId", async (c) => {
    const user = await User.findOne({ accountId: c.req.param("accountId") });
    if (!user) return c.json({ error: "User not Found!" });

    if (Bun.env.ARENA) {
      const arena = await Arena(user.accountId, user.hype);
      return c.json(arena);
    }

    return c.json({});
  });
}
