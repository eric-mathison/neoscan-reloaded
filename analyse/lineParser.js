const Hit = require('../Hit');

module.exports = function createParser(line) {
    const newTypeRegex = new RegExp(/Damage:\s([0-9]+\.[0-9])+\sTarget\s([\w]+)\s/);
    const newHitRegex = new RegExp(/Local Player:Damage/);
    const newReductionRegex = new RegExp(/Damage:\s([0-9]+\.[0-9]+)\s\(Reduction: ([0-9]+\.[0-9]+)\s\-\s([0-9]+\.[0-9]+)\sPercentage\)\s\-[\w\s]+(armor|skills|shields)/);
    let currentHit = new Hit();

    return {
        parse: function (line) {
            if(line.startsWith('Character System: Acceleration ')) return;

            if(newHitRegex.test(line)) {
                currentHit.log();
                currentHit = new Hit();
                return;
            }

            const newType = newTypeRegex.exec(line)
            if(newType && newType.length) {
                currentHit.closeType();
                const damage = parseFloat(newType[0]);
                const type = newType[1];
                currentHit.regesterType(type, damage);
                return;
            }

            const newReduction = newReductionRegex.exec(line);
            if(newReduction && newReduction.length) {
                const damageAfterReduction = newReduction[0];
                const ongoingTotalReduction = newReduction[1];
                const ongoingTotalPercentage = newReduction[2];
                const reductionSource = newReduction[3];
                currentHit.reduceType(reductionSource, damageAfterReduction);
            }
            console.log(line);
        },
        dumb: function (line) {
            if(line.startsWith('Character System: Acceleration ')) return;
            console.log(line);
        }
    }
}
