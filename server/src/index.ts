import dotenv from "dotenv";
import http from "http";

const { SERVER_HOST, SERVER_PORT } = dotenv.config({ path: "../.env" }).parsed as any;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end("Diabetiki Server");
});

server.listen(SERVER_HOST, SERVER_PORT, () => {
	console.log(`Server running at http://${SERVER_HOST}:${SERVER_PORT}/`);
});
