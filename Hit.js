module.exports = function() {
    const types = [];
    let currentType = 0;
    return {
        regesterType: function(typeName, damage) {
            currentType = new DamageType();
        },
        reduceType: function (reductionSource, damageAfterReduction) {
            if(!currentType) return;
            currentType.regesterReduction(reductionSource, damageAfterReduction);
        },
        closeType: function() {
            if(currentType) types.push(currentType.summarise());
        },
        log: function() {

        }
    }
}
