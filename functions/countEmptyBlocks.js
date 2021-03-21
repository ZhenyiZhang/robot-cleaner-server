const countEmptyBlocks = (map) => {
	let counter = 0;
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			map[i][j] === " " && counter++;
		}
	}
	return counter;
};

module.exports = countEmptyBlocks;
