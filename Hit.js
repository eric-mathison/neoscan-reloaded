"use strict";
const DamageType = require("./DamageType");
const Table = require("cli-table");

module.exports = function () {
    let currentType = 0;
    let logTimeout = null;

    const table = new Table({
        head: [
            "Damage Taken",
            "Maximum Damage",
            "Reduced By",
            "Type",
            "Zone",
            "Resistance Breakdown",
            "Capped",
        ],
        colWidths: [14, 16, 17, 12, 9, 60, 14],
    });

    function closeType() {
        if (currentType) {
            // console.log("log: writing to table");
            currentType.summarise(table);
            currentType = 0;
        } else if (table.length > 0) {
            // console.log("table still has data");
        } else {
            // console.log("Nothing written to table");
        }
    }

    function log() {
        // console.log("log");
        closeType();
        if (table.length > 0) {
            console.log(table.toString());
            // console.log("table written");
        }
    }

    return {
        registerType: function (typeName, damage, zone) {
            currentType = new DamageType(typeName, damage, zone);
        },
        setTimeout: function () {
            // console.log("Setting Timeout");
            logTimeout = setTimeout(() => {
                // console.log("log timeout running");
                log();
            }, 2500);
        },
        reduceType: function (
            reductionSource,
            damageAfterReduction,
            totalPercentage
        ) {
            if (!currentType) return;
            currentType.registerReduction(
                reductionSource,
                damageAfterReduction,
                totalPercentage
            );
        },
        capType: function (resistCap) {
            if (!currentType) return;
            currentType.setCap(resistCap);
        },
        closeType: closeType,
        close: function () {
            // console.log("clear timeout");
            clearTimeout(logTimeout);
            log();
        },
    };
};
