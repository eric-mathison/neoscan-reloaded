require('mocha');
require('should');
const DamageType = require('../DamageType');

describe('Calculating Resistances', () => {
    describe('Resisting damage using just a shield on cap', () => {
        let damage, results;
        beforeEach(() => {
            damage = new DamageType('Fire', 100, 80);
            damage.registerReduction('shield', 20, 80);
            results = [];
            damage.summarise(results)
        })

        it('should give the reduced damage value', () => {
            results[0][0].should.equal('20.00'.red)
        })

        it('should give the total damage value', () => {
            results[0][1].should.equal('100.00'.red)
        })

        it('should give the total reduction', () => {
            results[0][2].should.equal('80.00'.red)
        })

        it('should give the damage type', () => {
            results[0][3].should.equal('Fire'.red)
        })

        it('should give the resistance breakdown', () => {
            results[0][4].should.equal('shield 80.00 (100%)'.cyan)
        })

        it('should give the resistance capped state', () => {
            results[0][5].should.equal(true)
        })
    })

    describe('Resisting damage using just a shield above cap', () => {
        let damage, results;
        beforeEach(() => {
            damage = new DamageType('Fire', 100, 80);
            damage.registerReduction('shield', 5, 95);
            results = [];
            damage.summarise(results)
        })

        it('should give the reduced damage value', () => {
            results[0][0].should.equal('20.00'.red)
        })

        it('should give the total damage value', () => {
            results[0][1].should.equal('100.00'.red)
        })

        it('should give the total reduction', () => {
            results[0][2].should.equal('80.00'.red)
        })

        it('should give the damage type', () => {
            results[0][3].should.equal('Fire'.red)
        })

        it('should give the resistance breakdown', () => {
            results[0][4].should.equal('shield 80.00 (100%)'.cyan)
        })

        it('should give the resistance capped state', () => {
            results[0][5].should.equal(true)
        })
    })

    describe('Resisting damage using just a shield below cap', () => {
        let damage, results;
        beforeEach(() => {
            damage = new DamageType('Fire', 100, 80);
            damage.registerReduction('shield', 75, 25);
            results = [];
            damage.summarise(results)
        })

        it('should give the reduced damage value', () => {
            results[0][0].should.equal('75.00'.red)
        })

        it('should give the total damage value', () => {
            results[0][1].should.equal('100.00'.red)
        })

        it('should give the total reduction', () => {
            results[0][2].should.equal('25.00'.red)
        })

        it('should give the damage type', () => {
            results[0][3].should.equal('Fire'.red)
        })

        it('should give the resistance breakdown', () => {
            results[0][4].should.equal('shield 25.00 (100%)'.cyan)
        })

        it('should give the resistance capped state', () => {
            results[0][5].should.equal(false)
        })
    });

    describe('Resisting damage using a shield and armor cumulative under cap', () => {
        let damage, results;
        beforeEach(() => {
            damage = new DamageType('Fire', 100, 80);
            damage.registerReduction('shield', 90, 10);
            damage.registerReduction('armor', 80, 20);
            results = [];
            damage.summarise(results)
        })

        it('should give the reduced damage value', () => {
            results[0][0].should.equal('80.00'.red)
        })

        it('should give the total damage value', () => {
            results[0][1].should.equal('100.00'.red)
        })

        it('should give the total reduction', () => {
            results[0][2].should.equal('20.00'.red)
        })

        it('should give the damage type', () => {
            results[0][3].should.equal('Fire'.red)
        })

        it('should give the resistance breakdown', () => {
            results[0][4].should.equal('shield 10.00 (50%)'.cyan+' ' +'armor 10.00 (50%)'.green)
        })

        it('should give the resistance capped state', () => {
            results[0][5].should.equal(false)
        })
    });

    describe('Resisting damage using a shield and armor, armor at cap', () => {
        let damage, results;
        beforeEach(() => {
            damage = new DamageType('Fire', 100, 80);
            damage.registerReduction('shield', 80, 10);
            damage.registerReduction('armor', 20, 80);
            results = [];
            damage.summarise(results)
        })

        it('should give the reduced damage value', () => {
            results[0][0].should.equal('20.00'.red)
        })

        it('should give the total damage value', () => {
            results[0][1].should.equal('100.00'.red)
        })

        it('should give the total reduction', () => {
            results[0][2].should.equal('80.00'.red)
        })

        it('should give the damage type', () => {
            results[0][3].should.equal('Fire'.red)
        })

        it('should give the resistance breakdown', () => {
            results[0][4].should.equal('shield 20.00 (25%)'.cyan+' ' +'armor 60.00 (75%)'.green)
        })

        it('should give the resistance capped state', () => {
            results[0][5].should.equal(true)
        })
    });

    describe('Resisting damage using a shield and armor, armor above cap', () => {
        let damage, results;
        beforeEach(() => {
            damage = new DamageType('Fire', 100, 80);
            damage.registerReduction('shield', 70, 10);
            damage.registerReduction('armor', 10, 80);
            results = [];
            damage.summarise(results)
        })

        it('should give the reduced damage value', () => {
            results[0][0].should.equal('20.00'.red)
        })

        it('should give the total damage value', () => {
            results[0][1].should.equal('100.00'.red)
        })

        it('should give the total reduction', () => {
            results[0][2].should.equal('80.00'.red)
        })

        it('should give the damage type', () => {
            results[0][3].should.equal('Fire'.red)
        })

        it('should give the resistance breakdown', () => {
            results[0][4].should.equal('shield 30.00 (38%)'.cyan+' ' +'armor 50.00 (63%)'.green)
        })

        it('should give the resistance capped state', () => {
            results[0][5].should.equal(true)
        })
    });
})
