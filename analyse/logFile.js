'use strict'
const logPath = "C:\\Games\\Neocron 2.2 CE\\logs"

module.exports = function createPath(characterName, basePath) {
    basePath = basePath || logPath;
    return `${basePath}\\${characterName}_00.log`;
}
