"use strict";
const DamageType = require("./DamageType");
const Table = require("cli-table");

module.exports = function () {
    let currentType = 0;
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
        colWidths: [14, 16, 17, 10, 9, 60, 14],
    });

    function closeType() {
        if (currentType) {
            currentType.summarise(table);
            currentType = 0;
        }
    }

    function log() {
        closeType();
        if (table.length > 0) {
            console.log(table.toString());
        }
    }
    const logTimeout = setTimeout(log, 500);

    return {
        registerType: function (typeName, damage, zone) {
            currentType = new DamageType(typeName, damage, zone);
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
            clearTimeout(logTimeout);
            log();
        },
    };
};
