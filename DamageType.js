module.exports = function(description, baseDamageAmount) {
    const reductions = [];
    let damageAfterReduction = 0;
    let capReached = false;
    return {
        regesterReduction: function (source, damageAfterReduction, totalPercentage) {
            if(capReached) return;
            if(totalPercentage > 80) {
                damageAfterReduction = Math.floor(baseDamageAmount * (20)/100)
                capReached = true;
            }
            reductions.push({
                source: source,
                damageAfterReduction: damageAfterReduction
            })
        },
        summarise: function() {
            reductions.reduce((lastReduction, reduction) => {
                reduction.reducedDamageBy = lastReduction - reduction.damageAfterReduction;
                return reduction.damageAfterReduction;
            }, baseDamageAmount);

            const reducedDamage = reductions.reduce((total, reduction) => total + reduction.reducedDamageBy, 0);

            const reductionsMessage = reductions.map(reduction => {
                return `${reduction.source} -${reduction.reducedDamageBy}`;
            })
            return `${baseDamageAmount-reducedDamage}/${baseDamageAmount} ${description} Damage \t| ${reductionsMessage}`
        }
    }
}
