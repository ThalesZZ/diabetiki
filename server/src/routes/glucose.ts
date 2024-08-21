import { Express, Router } from "express";
import z from "zod";

export async function registerGlucoseRoutes(app: Express) {
  const router = Router();

  app.post("/glucose", async function (req, res) {
    const schema = z.object({
      timestamp: z.coerce.date(),
      glucose: z.number(),
      comment: z.string().optional(),
    });

    const raw = schema.parse(req.body);
    // const event = await prisma.glucoseEvent.create({ data: raw });

    console.log(raw);
    res.send(raw);
  });

  app.use(router);
}
