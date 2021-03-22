const fs = require("fs");
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
