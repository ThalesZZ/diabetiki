import dotenv from "dotenv";
import http from "http";

const path = "../.env";
const { SERVER_HOST, SERVER_PORT } = dotenv.config({ path }).parsed as any;

const address = `http://${SERVER_HOST}:${SERVER_PORT}/`;

console.log(`Preparing to start server at ${address}`);

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end("Diabetiki Server");
});

server.listen(SERVER_PORT, SERVER_HOST, () => {
	console.log(`Server running at ${address}`);
});
