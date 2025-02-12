import app from "..";
import bcrypt from "bcrypt";
import User from "../tables/user";
import { v4 } from "uuid";
import { createProfiles } from "../utilities/createProfiles";
import Profile from "../tables/profile";

export default function () {
  app.post("/register", async (c) => {
    const { email, password, username } = await c.req.json();
    if (!email || !password || !username) {
      return c.json({
        error: "Missing Params, Please have Email, Password, and Username",
      });
    }

    const accountId = v4().replace(/-/gi, "");

    const hashedPassword = await bcrypt.hash(password, 10);
    const userProfile = await createProfiles(accountId);

    await User.create({
      accountId: accountId,
      username: username,
      email: email,
      password: hashedPassword,
      created: new Date(),
    }).then(async (user) => {
      await Profile.create({
        accountId: user.accountId,
        profiles: userProfile,
      });
    });

    return c.json({ text: "Successfully Made an Account!" });
  });
}
