'use strict'
const DamageType = require('./DamageType');
const Table = require('cli-table');

module.exports = function (classCap) {
    let currentType = 0;
    const table = new Table({
        head: ['Damage Taken', 'Maximum Damage', 'Reduced By', 'Type', 'Resistance Breakdown', 'Capped'],
        colWidths: [15, 20, 18, 15, 60, 15]
    })

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
        regesterType: function (typeName, damage) {
            currentType = new DamageType(typeName, damage, classCap);
        },
        reduceType: function (reductionSource, damageAfterReduction, totalPercentage) {
            if (!currentType) return;
            currentType.registerReduction(reductionSource, (damageAfterReduction), (totalPercentage));
        },
        closeType: closeType,
        close: function () {
            clearTimeout(logTimeout);
            log();
        }
    }
}
