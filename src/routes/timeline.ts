import app from "..";

export default function () {
  app.get("/fortnite/api/calendar/v1/timeline", async (c) => {
    const ver = Bun.env.SEASON;

    const current = new Date();
    current.setHours(24, 0, 0, 0);
    const midnight = new Date(current.getTime() - 60000);
    const mainDate = midnight.toISOString();

    return c.json({
      channels: {
        "client-matchmaking": {
          states: [],
          cacheExpire: "9999-01-01T22:28:47.830Z",
        },
        "client-events": {
          states: [
            {
              validFrom: "2019-01-01T00:00:00.000Z",
              activeEvents: [
                {
                  eventType: `EventFlag.Season${ver}`,
                  activeUntil: "9999-01-01T00:00:00.000Z",
                  activeSince: "2019-01-01T00:00:00.000Z",
                },
                {
                  eventType: `EventFlag.LobbySeason${ver}`,
                  activeUntil: "9999-01-01T00:00:00.000Z",
                  activeSince: "2019-01-01T00:00:00.000Z",
                },
              ],
              state: {
                activeStorefronts: [],
                eventNamedWeights: {},
                seasonNumber: ver,
                seasonTemplateId: `AthenaSeason:athenaseason${ver}`,
                matchXpBonusPoints: 0,
                seasonBegin: "2019-01-01T13:00:00Z",
                seasonEnd: "9999-01-01T14:00:00Z",
                seasonDisplayedEnd: "9999-01-01T07:30:00Z",
                weeklyStoreEnd: mainDate,
                stwEventStoreEnd: "9999-01-01T00:00:00.000Z",
                stwWeeklyStoreEnd: "9999-01-01T00:00:00.000Z",
                sectionStoreEnds: {
                  Featured: mainDate,
                },
                dailyStoreEnd: mainDate,
              },
            },
          ],
          cacheExpire: mainDate,
        },
      },
      eventsTimeOffsetHrs: 0,
      cacheIntervalMins: 10,
      currentTime: new Date().toISOString(),
    });
  });
}
