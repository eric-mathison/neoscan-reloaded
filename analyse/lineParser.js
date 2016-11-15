const Hit = require('../Hit');

module.exports = function createParser(line) {
    const newTypeRegex = new RegExp(/Damage:\s([0-9]+\.[0-9]+)\sTarget\s([\w\-]+)\s/);
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

            const newType = newTypeRegex.exec(line);
            if(newType && newType.length) {
                // console.log('new type', line);
                currentHit.closeType();
                const damage = parseFloat(newType[1]);
                const type = newType[2];
                currentHit.regesterType(type, damage);
                return;
            }

            const newReduction = newReductionRegex.exec(line);
            if(newReduction && newReduction.length) {
                // console.log('new reduction', line);
                const damageAfterReduction = parseFloat(newReduction[1]);
                const ongoingTotalReduction = parseFloat(newReduction[2]);
                const ongoingTotalPercentage = parseFloat(newReduction[3]);
                const reductionSource = newReduction[4];
                currentHit.reduceType(reductionSource, damageAfterReduction, ongoingTotalPercentage);
            }
        },
        dumb: function (line) {
            if(line.startsWith('Character System: Acceleration ')) return;
            console.log(line);
        }
    }
}
