import app from "..";

export default function () {
  app.get("/content/api/pages/fortnite-game", async (c) => {
    const ver = process.env.SEASON;
    const content = {
      _title: "Fortnite Game",
      _activeDate: "2017-08-30T03:20:48.050Z",
      lastModified: "2019-11-01T17:33:35.346Z",
      _locale: "en-US",
      tournamentinformation: {
        _activeDate: "0001-01-01T00:00:00",
        _locale: "en-US",
        _templateName: "FortniteGameTournamentInfo",
        _title: "tournamentinformation",
        conversion_config: {
          _type: "Conversion Config",
          containerName: "tournament_info",
          contentName: "tournaments",
          enableReferences: true,
        },
        lastModified: "0001-01-01T00:00:00",
        tournament_info: {
          _type: "Tournaments Info",
          tournaments: [
            {
              _type: "Tournament Display Info",
              loading_screen_image:
                "https://backend-overseas-project.xyz/arena%20solo.jpg",
              playlist_tile_image:
                "https://backend-overseas-project.xyz/arena%20solo.jpg",
              title_line_1: "ARENA",
              title_line_2: null,
              tournament_display_id: "core_arena_solo",
            },
          ],
        },
      },
      playlistinformation: {
        frontend_matchmaking_header_style: "None",
        _title: "playlistinformation",
        frontend_matchmaking_header_text: "",
        playlist_info: {
          _type: "Playlist Information",
          playlists: [
            {
              image: `https://backend-overseas-project.xyz/S${ver}Solo.png`,
              playlist_name: "Playlist_DefaultSolo",
              hidden: false,
              special_border: "None",
              _type: "FortPlaylistInfo",
            },
            {
              image: `https://backend-overseas-project.xyz/S${ver}Duo.png`,
              playlist_name: "Playlist_DefaultDuo",
              hidden: false,
              special_border: "None",
              _type: "FortPlaylistInfo",
            },
            {
              image: `https://backend-overseas-project.xyz/arena%20solo.jpg`,
              playlist_name: "Playlist_ShowdownAlt_Solo",
              hidden: false,
              special_border: "None",
              _type: "FortPlaylistInfo",
            },
            {
              image: `https://backend-overseas-project.xyz/arenaduo.png`,
              playlist_name: "Playlist_ShowdownAlt_Duo",
              hidden: false,
              special_border: "None",
              _type: "FortPlaylistInfo",
            },
            {
              image: `https://backend-overseas-project.xyz/S${ver}Trio.png`,
              playlist_name: "Playlist_Trios",
              hidden: false,
              _type: "FortPlaylistInfo",
            },
            {
              image: `https://backend-overseas-project.xyz/S${ver}Squad.png`,
              playlist_name: "Playlist_DefaultSquad",
              hidden: false,
              special_border: "None",
              _type: "FortPlaylistInfo",
            },
          ],
        },
        _noIndex: false,
        _activeDate: "2018-04-25T15:05:39.956Z",
        lastModified: "2019-10-29T14:05:17.030Z",
        _locale: "en-US",
      },
      emergencynoticev2: {
        "jcr:isCheckedOut": true,
        _title: "emergencynoticev2",
        _noIndex: false,
        "jcr:baseVersion": "a7ca237317f1e771e921e2-7f15-4485-b2e2-553b809fa363",
        emergencynotices: {
          _type: "Emergency Notices",
          emergencynotices: [
            {
              gamemodes: [],
              hidden: false,
              _type: "CommonUI Emergency Notice Base",
              title: "",
              body: "",
            },
          ],
        },
        _activeDate: "2018-08-06T19:00:26.217Z",
        lastModified: "2021-12-01T15:55:56.012Z",
        _locale: "en-US",
      },
      lobby: {
        stage: `season${ver}`,
        _title: "lobby",
        _activeDate: "2019-05-31T21:24:39.892Z",
        lastModified: "2019-07-31T21:24:17.119Z",
        _locale: "en-US",
      },

      dynamicbackgrounds: {
        backgrounds: {
          backgrounds: [
            { stage: `season${ver}`, _type: "DynamicBackground", key: "lobby" },
            { stage: `season${ver}`, _type: "DynamicBackground", key: "vault" },
          ],
          _type: "DynamicBackgroundList",
        },
        _title: "dynamicbackgrounds",
        _noIndex: false,
        _activeDate: "2019-08-21T15:59:59.342Z",
        lastModified: "2019-10-29T13:07:27.936Z",
        _locale: "en-US",
        _templateName: "FortniteGameDynamicBackgrounds",
      },
      shopSections: {
        _title: "shop-sections",
        sectionList: {
          _type: "ShopSectionList",
          sections: [
            {
              bSortOffersByOwnership: false,
              bShowIneligibleOffersIfGiftable: false,
              bEnableToastNotification: true,
              background: {
                stage: "default",
                _type: "DynamicBackground",
                key: "vault",
              },
              _type: "ShopSection",
              landingPriority: 70,
              bHidden: false,
              sectionId: "Featured",
              bShowTimer: true,
              sectionDisplayName: "Featured",
              bShowIneligibleOffers: true,
            },
            {
              bSortOffersByOwnership: false,
              bShowIneligibleOffersIfGiftable: false,
              bEnableToastNotification: true,
              background: {
                stage: "default",
                _type: "DynamicBackground",
                key: "vault",
              },
              _type: "ShopSection",
              landingPriority: 70,
              bHidden: false,
              sectionId: "Daily",
              bShowTimer: false,
              sectionDisplayName: "Daily",
              bShowIneligibleOffers: true,
            },
          ],
        },
        _noIndex: false,
        _activeDate: "2022-12-01T23:45:00.000Z",
        lastModified: "2022-12-01T21:50:44.089Z",
        _locale: "en-US",
        _templateName: "FortniteGameShopSections",
      },
      _suggestedPrefetch: [],
    };

    return c.json(content);
  });
}
