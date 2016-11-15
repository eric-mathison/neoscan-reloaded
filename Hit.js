module.exports = function() {
    const types = [];
    let currentType = 0;
    return {
        regesterType: function(typeName, damage) {

        },
        closeType: function() {
            if(currentType) types.push(currentType);
            currentType = new DamageType();
        }
    }
}
