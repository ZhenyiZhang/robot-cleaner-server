const countEmptyBlock = require("../functions/countEmptyBlocks");
const initRobotPos = require("../functions/initRobotPos");
const mapToString = require("../functions/mapToString");
const stringToMap = require("../functions/stringToMap");
const directions = require("../constant/directions");
const pause = require("../functions/pause");
const WebSocket = require("ws");

// the time of robot moving one step
const actionTime = 200;

class RobotClean {
	constructor(mapStr, wss) {
		this.websocket = wss;
		this.map = stringToMap(mapStr);
		this.height = this.map.length;
		this.width = this.map[0].length;
		this.robotPos = initRobotPos(this.map);
		this.totalEmptyBlocks = countEmptyBlock(this.map);
		this.emptyBlocks = this.totalEmptyBlocks;
		this.cleaningStartTime = null;
		this.stepsTook = 0;
	}

	printMap() {
		console.log(mapToString(this.map, this.robotPos));
	}

	getMap() {
		return mapToString(this.map, this.robotPos);
	}

	// send map and robot status report to clients
	sendData() {
		this.websocket.clients.forEach(client => {
			if (client.readyState === WebSocket.OPEN) {
				const data = {
					map: this.getMap(),
					emptyBlocks: this.emptyBlocks,
					totalEmptyBlocks: this.totalEmptyBlocks,
					height: this.height,
					width: this.width,
					stepsTook: this.stepsTook,
				};
				client.send(JSON.stringify(data));
			}
		});
	}

	cleanBlock(x, y) {
		if (this.map[x][y] === " ") {
			this.emptyBlocks--;
			this.map[x][y] = "_";
		}
	}

	// move the robot one step back
	moveBack(curDir) {
		const x = this.robotPos[0],
			y = this.robotPos[1];
		pause(actionTime);
		this.cleanBlock(x, y);
		this.stepsTook++;
		this.robotPos = [x - curDir[0], y - curDir[1]];
		this.sendData();
	}

	// move robot one step forward
	moveForward(curDir) {
		this.printMap();
		const x = this.robotPos[0],
			y = this.robotPos[1];
		if (this.map[x + curDir[0]][y + curDir[1]] === " ") {
			this.cleanBlock(x, y);
			pause(actionTime);
			this.stepsTook++;
			this.robotPos = [x + curDir[0], y + curDir[1]];
			this.sendData();
			return true;
		}
		return false;
	}

	explore = (curDir) => {
		const x = this.robotPos[0],
			y = this.robotPos[1];
		if (this.map[x][y] === "_") return;
		for (let i = 0; i < directions.length; i++) {
			if (this.moveForward(directions[curDir])) {
				this.explore(curDir);
				if(this.emptyBlocks === 0) return;
				this.moveBack(directions[curDir]);
			}
			curDir += 1;
			curDir %= 4;
		}
	};

	clean() {
		for (let i = 0; i < directions.length; i++) {
			if (
				this.map[this.robotPos[0] + directions[i][0]][
					this.robotPos[1] + directions[i][1]
				] === " "
			) {
				this.explore(i);
				break;
			}
		}
		this.printMap();
	}
}

module.exports = RobotClean;
