import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongo } from "./mongo.js";
import { buildRoutes } from "./routes.js";
import { sublyzerProxy } from "./sublyzerProxy.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 5001);
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
const MONGO_URL = process.env.MONGO_URI;

app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));

app.use("/api", buildRoutes());
app.all(/^\/sublyzer\/.*/, sublyzerProxy);

async function start() {
  await connectMongo(MONGO_URL);
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`API listening on :${PORT}`);
  });
}

start().catch((e) => {
  console.error("Failed to start:", e);
  process.exit(1);
});
