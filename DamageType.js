module.exports = function(description, baseDamageAmount) {
    const reductions = [];
    return {
        regesterReduction: function (source, damageAfterReduction) {
            reductions.push({
                source: source,
                damageAfterReduction: damageAfterReduction
            })
        },
        summarise: function() {
            reductions.reduce(reduction => {

            }, baseDamageAmount)
        }
    }
}
