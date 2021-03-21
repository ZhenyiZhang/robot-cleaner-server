const pause = (time) => {
    const startTime = new Date();
    let currentTime = new Date();
    while(currentTime - startTime < time) {
        currentTime = new Date();
    } 
}

module.exports = pause;