"use strict";
const path = require("path");
const PRODUCTION = "production";
const NODE_ENV = process.env.NODE_ENV || PRODUCTION;
console.log(NODE_ENV);
const logPath =
    NODE_ENV === "production"
        ? path.join(path.dirname(process.execPath), "\\logs\\")
        : path.join(__dirname, "../logs/");

module.exports = function createPath(characterName, basePath) {
    basePath = basePath || logPath;
    return `${basePath}${characterName}_00.log`;
};
