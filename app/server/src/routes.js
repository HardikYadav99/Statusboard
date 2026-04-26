import express from "express";
import { getDb } from "./mongo.js";

export function buildRoutes() {
  const router = express.Router();

  router.get("/health", (req, res) => {
    res.json({ ok: true, service: "statusboard-api" });
  });

  router.get("/debug/error", (req, res) => {
    throw new Error("Controlled demo error: /api/debug/error");
  });

  router.get("/debug/slow", async (req, res) => {
    const ms = Number(process.env.SLOW_MS || 2500);
    await new Promise((r) => setTimeout(r, ms));
    res.json({ ok: true, slowMs: ms });
  });

  router.get("/issues", async (req, res, next) => {
    try {
      const db = getDb();
      const issues = await db
        .collection("issues")
        .find({})
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray();

      res.json({ ok: true, issues });
    } catch (e) {
      next(e);
    }
  });

  router.post("/issues", async (req, res, next) => {
    try {
      const { title, description } = req.body || {};
      if (!title || typeof title !== "string") {
        return res.status(400).json({ ok: false, error: "title is required" });
      }

      const issue = {
        title: title.trim(),
        description: typeof description === "string" ? description.trim() : "",
        status: "open",
        createdAt: new Date(),
      };

      const db = getDb();
      const result = await db.collection("issues").insertOne(issue);

      res
        .status(201)
        .json({ ok: true, issue: { ...issue, _id: result.insertedId } });
    } catch (e) {
      next(e);
    }
  });

  return router;
}
