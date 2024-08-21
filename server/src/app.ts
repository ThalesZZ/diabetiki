import cors from 'cors'
import express from 'express'

import { registerGlucoseRoutes } from './routes/glucose'

const app = express()
const port = 3030

app.use(cors({    origin: true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Diabetiki server is alive!')
})

registerGlucoseRoutes(app)

app.listen(port, () => {
    console.log(`Listening to port ${port}.`)
})