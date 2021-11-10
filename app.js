"use strict";
const watch = require("./analyse/liveScan")().watchLogFile;
const scanner = require("./analyse/scan")();

module.exports = function app(characterName, mode, options) {
    if (mode === "watch") {
        watch(options, characterName);
    } else if (mode === "scan") {
        scanner.scan(options, characterName);
    }
};
