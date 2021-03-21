const mapToString = (mapArr, robotPos) => {
	const robotPosChar = mapArr[robotPos[0]][robotPos[1]];
	mapArr[robotPos[0]][robotPos[1]] = "*";
	const result = mapArr
		.map((line) => {
			return line.join("");
		})
		.join("\n");
	mapArr[robotPos[0]][robotPos[1]] = robotPosChar;
	return result;
};

module.exports = mapToString;
