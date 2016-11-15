const DamageType = require('./DamageType');

module.exports = function() {
    const types = [];
    let currentType = 0;
    return {
        regesterType: function(typeName, damage) {
            currentType = new DamageType(typeName, Math.floor(damage));
        },
        reduceType: function (reductionSource, damageAfterReduction, totalPercentage) {
            if(!currentType) return;
            currentType.regesterReduction(reductionSource, Math.floor(damageAfterReduction), Math.floor(totalPercentage));
        },
        closeType: function() {
            if(currentType) {
                types.push(currentType.summarise());
            }
        },
        log: function() {
            this.closeType();
            types.map(type => console.log(type));
        }
    }
}
