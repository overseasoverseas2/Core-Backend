import { Hono } from "hono";
import { logger } from "hono/logger";
import mongoose from "mongoose";
import path from "path";
import { config } from "dotenv";
import { loadRoutes } from "./utilities/loadRoutes";
import { throwError } from "./utilities/throwError";

config({ path: path.join(__dirname, "../config/.env") });

const app = new Hono({ strict: false });
const port: number = 443;

Bun.serve({
  port: port,
  fetch: app.fetch,
});

console.log("Core started running on " + port);
export default app;

app.notFound(async (c) => {
  return throwError(
    "errors.com.core.common.not_found",
    "Sorry the resource you were trying to find could not be found.", [] , 1004, "", 404, c
  );
});

app.use(logger());

const mongoURI = Bun.env.MONGO_URL || "mongodb://localhost:27017/core";
try {
  mongoose.connect(mongoURI);
  console.log("Connected to Database");
} catch (error) {
  console.log("Couldn't connect to the Database. " + error);
}

await loadRoutes(path.join(__dirname, "routes"), app);
await loadRoutes(path.join(__dirname, "operations"), app);
