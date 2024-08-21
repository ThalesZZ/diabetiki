import { Express, Router } from "express";
import z from "zod";
import prisma from "../lib/prisma";

export async function registerGlucoseRoutes(app: Express) {
  const router = Router();

  app.post("/glucose", async function (req, res) {
    const schema = z.object({
      timestamp: z.coerce.date(),
      value: z.number(),
      comment: z.string().optional(),
    });

    const raw = schema.parse(req.body);
    const event = await prisma.glucoseEvent.create({ data: raw });

    console.log("Created GlucoseEvent:", event);
    res.send(event);
  });

  app.get("/glucose", async function (req, res) {
    const events = await prisma.glucoseEvent.findMany();
    res.send(events);
  });

  app.use(router);
}
