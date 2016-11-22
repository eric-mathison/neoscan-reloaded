'use strict'
const fs = require('fs');
const LineParser = require('./lineParser');
const crash = require('../crash');
const logFile = require('./logFile');

module.exports = function scanner() {
    const parser = new LineParser();

    function runScan(characterName, path, lineRead) {
        console.log('scanning', logFile(characterName, path));
        const stream = require('readline').createInterface({
            input: fs.createReadStream(logFile(characterName, path))
        });
        stream.on('line', lineRead);
        stream.on('error', crash);
    }

    return {
        scan: function(options, characterName, path) {
            runScan(characterName, path, parser.parse.bind(null, options, characterName))
        },
        dumb: function(characterName, path) {
            runScan(characterName, path, parser.dumb)
        }
    }
}
