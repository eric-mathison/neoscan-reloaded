const DamageType = require('./DamageType');
const Table = require('cli-table');

module.exports = function() {
    let numberOfTypes = 0;
    let currentType = 0;
    const table = new Table({
        head: ['Damage Taken', 'Maximum Damage', 'Reduced By', 'Type', 'Resistance Breakdown'],
        colWidths: [15, 20, 15, 15, 60]
    })

    function closeType() {
        if(currentType) {
            numberOfTypes++;
            currentType.summarise(table);
            currentType = 0;
        }
    }

    function log() {
        closeType();
        if(table.length > 0) {
            console.log(table.toString());
        }
    }
    const logTimeout = setTimeout(log, 500);

    return {
        regesterType: function(typeName, damage) {
            currentType = new DamageType(typeName, Math.round(damage));
        },
        reduceType: function (reductionSource, damageAfterReduction, totalPercentage) {
            if(!currentType) return;
            currentType.regesterReduction(reductionSource, Math.round(damageAfterReduction), Math.round(totalPercentage));
        },
        closeType: closeType,
        close: function() {
            clearTimeout(logTimeout);
            log();
        }
    }
}
