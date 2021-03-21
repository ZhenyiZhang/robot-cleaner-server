const { mapA, mapB } = require("./maps/maps");
const fs = require("fs");
const mapC = fs.readFileSync("./maps/mapc.txt");
const RobotClean = require("./classes/RobotClean");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8000 });

wss.on("connection", (ws) => {
	ws.send("connection was built");
	ws.on("message", (map) => {
		const robotClean = new RobotClean(map, wss); 
		robotClean.clean();
	});
});
