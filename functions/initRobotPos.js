const initRobotPos = (map) => {
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			// Found the first uncleaned block and start DFS
			if (map[i][j] === ' ') {
				return [i, j];
			}
		}
	}
};

module.exports = initRobotPos;
