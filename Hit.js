const DamageType = require('./DamageType');

module.exports = function() {
    const types = [];
    let currentType = 0;

    function closeType() {
        if(currentType) {
            types.push(currentType.summarise());
            currentType = 0;
        }
    }

    function log() {
        closeType();
        types.map(type => console.log(type));
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
