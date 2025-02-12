import { readdirSync } from "fs";
import { join, parse } from "path";
import { Hono, type Context } from "hono";
import { readdir } from "node:fs/promises";

// thanks skies

type EndpointHandler = (c: Context) => Promise<void>;
interface EndpointHandlers {
  [key: string]: EndpointHandler;
}

async function loadRoute(directory: string, file: string) {
  try {
    const RouteModule = await import(join(directory, file));
    const defaultExport = RouteModule.default;

    if (defaultExport && typeof defaultExport === "function") {
      defaultExport();
    } else {
      console.error(`${file} does not export a valid route initializer`);
    }
  } catch (error) {
    console.error(`Error loading route ${file}: ${(error as Error).message}`);
  }
}

export async function loadRoutes(directory: string, app: Hono): Promise<void> {
  try {
    const files = readdirSync(directory);

    const routedFiles = files.filter(
      (name) => name.endsWith(".ts") || name.endsWith(".js")
    );

    for (const file of routedFiles) {
      await loadRoute(directory, file);
    }
  } catch (error) {
    console.error(`Failed to load routes: ${error}`);
  }
}
