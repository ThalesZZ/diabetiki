import dotenv from "dotenv";
import express from 'express';
import router from "./routes";

const path = "../.env";
const { SERVER_HOST, SERVER_PORT } = dotenv.config({ path }).parsed as any;

const address = `http://${SERVER_HOST}:${SERVER_PORT}/`;

console.log(`Preparing to start server at ${address}`);

const app = express()
app.use(router);

app.get('/', (req, res) => {
	res.send('Server is up!')
})

app.listen(SERVER_PORT, SERVER_HOST, () => {
	console.log(`Server running at ${address}`);
});
