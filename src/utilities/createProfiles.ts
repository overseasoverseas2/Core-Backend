import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

interface Profiles {
  [key: string]: Profiles;
}

async function createProfiles(accountId: any) {
  let profiles: Profiles = {};

  const currentFileUrl = import.meta.url;
  const currentFilePath = fileURLToPath(currentFileUrl);
  const currentDirPath = dirname(currentFilePath);
  const profilesDirectory = path.join(
    currentDirPath,
    "..",
    "..",
    "static",
    "profiles"
  );

  try {
    const files = await fs.readdir(profilesDirectory);

    await Promise.all(
      files.map(async (fileName) => {
        const filePath = path.join(profilesDirectory, fileName);
        const data = await fs.readFile(filePath, "utf8");
        const profile = JSON.parse(data);

        profile.accountId = accountId;
        profile.created = new Date().toISOString();
        profile.updated = new Date().toISOString();

        profiles[profile.profileId] = profile;
      })
    );

    return profiles;
  } catch (error) {
    console.error("Error reading profiles directory:", error);
    throw error;
  }
}

export { createProfiles };
