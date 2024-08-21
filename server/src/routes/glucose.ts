import { Express, Router } from "express";

export async function registerGlucoseRoutes(app: Express) {
  const router = Router();

  app.post("/glucose", async function (req, res) {
    // const evt = await prisma.glucoseEvent.findFirst()

    // res.send(evt?.id || 'not founddd')
    console.log(req.body);
    res.send(req.body);
  });

  app.use(router);
}
