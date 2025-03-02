import app from "..";
import Profile from "../tables/profile";
import { applyProfileChanges } from "ares-library";

export default function () {
  app.post(
    "/fortnite/api/game/v2/profile/:accountId/dedicated_server/QueryProfile",
    async (c) => {
      const { profileId } = c.req.query();
      var profiles: any = await Profile.findOne({
        accountId: c.req.param("accountId"),
      });
      let profile = profiles.profiles[profileId];
      const response = await applyProfileChanges(profile, profileId, profiles);

      return c.json(response);
    }
  );
}
