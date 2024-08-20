import { Express, Router } from "express";
import prisma from '../lib/prisma';

export async function registerGlucoseRoutes(app: Express) {
    const router = Router()

    app.get('/glucose', function(req, res) {
        res.send('glucose route')
    })

    app.post('/glucose', async function(req, res) {
        const evt = await prisma.glucoseEvent.findFirst()
        
        res.send(evt?.id || 'not founddd')
    })

    app.use(router)
}