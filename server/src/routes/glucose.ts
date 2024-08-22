import { GlucoseEvent } from "@prisma/client";
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
    res.send(event);
  });

  app.post("/glucose/edit", async function (req, res) {
    const schema = z.object({
      id: z.string(),
      timestamp: z.coerce.date(),
      value: z.number(),
      comment: z.string().nullable(),
    });

    const { id, ...raw } = schema.parse(req.body);
    const updated: Omit<GlucoseEvent, "id"> = { ...raw };

    const event = await prisma.glucoseEvent.update({
      where: { id },
      data: updated,
    });
    res.send(event);
  });

  app.delete("/glucose/:id", async function (req, res) {
    const { id } = req.params;
    const event = await prisma.glucoseEvent.delete({ where: { id } });
    res.send(event);
  });

  app.get("/glucose", async function (req, res) {
    const events = await prisma.glucoseEvent.findMany();
    res.send(events);
  });

  app.use(router);
}
