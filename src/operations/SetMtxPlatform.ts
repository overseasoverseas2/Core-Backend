import app from "..";
import { applyProfileChanges } from "ares-library";
import Profile from "../tables/profile";
import User from "../tables/user";

export default function () {
  app.post(
    "/fortnite/api/game/v2/profile/:accountId/client/SetMtxPlatform",
    async (c) => {
      try {
        const { profileId } = c.req.query();
        var profiles: any = await Profile.findOne({
          accountId: c.req.param("accountId"),
        });
        let profile = profiles?.profiles[profileId];
        if (!profile || !profiles) {
          return c.json({
            profileRevision: 0,
            profileId: profileId,
            profileChangesBaseRevision: 0,
            profileChanges: [],
            profileCommandRevision: 0,
            serverTime: new Date().toISOString(),
            multiUpdate: [],
            responseVersion: 1,
          });
        }
        const user = await User.findOne({
          accountId: c.req.param("accountId"),
        });
        if (!user) return c.json({ error: "No user found!" });

        const response = await applyProfileChanges(
          profile,
          profileId,
          profiles
        );

        return c.json(response);
      } catch (error) {
        console.error(error);
      }
    }
  );
}
