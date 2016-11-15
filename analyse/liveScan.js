const Tail = require('tail').Tail
const LineParser = require('./lineParser');
const crash = require('../crash');
const logFile = require('./logFile')

module.exports = function createLiveScanner() {
    const parser = new LineParser();

    function poll(path) {
        const scan = new Tail(path);

        scan.on('line', lineScanned);
        scan.on('error', crash);
    }

    function lineScanned(line) {
        parser.parse(line);
    }

    return {
        watchLogFile: function(characterName, path) {
            poll(logFile(characterName, path));
        }
    }
}
