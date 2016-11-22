'use strict'
const Tail = require('tail').Tail
const LineParser = require('./lineParser');
const crash = require('../crash');
const logFile = require('./logFile')

module.exports = function createLiveScanner() {
    const parser = new LineParser();

    function poll(options, characterName, path) {
        const scan = new Tail(path);

        scan.on('line', parser.parse.bind(null, options, characterName));
        scan.on('error', crash);
    }

    return {
        watchLogFile: function(options, characterName, path) {
            poll(options, characterName, logFile(characterName, path));
        }
    }
}
