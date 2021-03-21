const stringToMap = (str) => {
    return str.split('\n').map(line => line.split(''));
}

module.exports = stringToMap;