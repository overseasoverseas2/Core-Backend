import app from "..";
import { applyProfileChanges } from "ares-library";
import Profile from "../tables/profile";
import path from "path";
import fs from "fs";
import { v4 } from "uuid";

export default function () {
  app.post(
    "/fortnite/api/game/v2/profile/:accountId/client/ClientQuestLogin",
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

        const ver = process.env.SEASON;

        const DailyQuestsDir = path.join(
          __dirname,
          "..",
          "local",
          "quests",
          `s${ver}`,
          "repeatable"
        );

        const files = fs.readdirSync(DailyQuestsDir);
        const DailyQuests = files.slice(0, 3); // not proper for now....

        for (const file of DailyQuests) {
          const questPath = path.join(DailyQuestsDir, file);
          const questJSON = JSON.parse(fs.readFileSync(questPath, "utf-8"));
          const Objectives = questJSON.Properties.Objectives[0];
          const questId = `Quest:${questJSON.Name}`;

          if (
            Object.values(profile.items).some(
              (item: any) => item.templateId === `Quest:${questJSON.Name}`
            )
          ) {
            continue;
          }

          profile.items[v4()] = {
            templateId: questId,
            attributes: {
              quest_state: "Active",
              creation_time: new Date().toISOString(),
              level: -1,
              sent_new_notification: true,
              xp_reward_scalar: 1,
              last_state_change_time: new Date().toISOString(),
              quest_rarity: "uncommon",
              [`completion_${Objectives.BackendName}`]: 0,
            },
          };
        }

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
