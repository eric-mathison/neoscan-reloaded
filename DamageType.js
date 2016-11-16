const colors = require('colors');

module.exports = function(description, baseDamageAmount) {
    const reductionColours = {
        shield: 'cyan',
        armor: 'green',
        skills: 'blue'
    }
    const typeColours = {
        Piercing: 'white',
        Force: 'grey',
        Fire: 'red',
        Energy: 'blue',
        "X-ray": 'cyan',
        "X-Ray": 'cyan',
        Poison: 'green',
        Healing: 'yellow'
    }
    const reductions = [];
    let damageAfterReduction = 0;
    let capReached = false;
    return {
        regesterReduction: function (source, damageAfterReduction, totalPercentage) {
            if(capReached) return;
            if(totalPercentage > 80) {
                damageAfterReduction = Math.round(baseDamageAmount * (20)/100)
                capReached = true;
            }
            reductions.push({
                source: source,
                damageAfterReduction: damageAfterReduction
            })
        },
        summarise: function(table) {
            reductions.reduce((lastReduction, reduction) => {
                reduction.reducedDamageBy = lastReduction - reduction.damageAfterReduction;
                return reduction.damageAfterReduction;
            }, baseDamageAmount);

            const reducedDamage = reductions.reduce((total, reduction) => total + reduction.reducedDamageBy, 0);

            const reductionsMessage = reductions.map(reduction => {
                return `${reduction.source} ${reduction.reducedDamageBy} (${Math.round(reduction.reducedDamageBy/reducedDamage*100)}%)`[reductionColours[reduction.source]];
            }).join(' ');
            table.push([
                `${baseDamageAmount-reducedDamage}`[typeColours[description]],
                `${baseDamageAmount}`[typeColours[description]],
                `${reducedDamage}`[typeColours[description]],
                `${description}`[typeColours[description]],
                reductionsMessage
            ]);
        }
    }
}
