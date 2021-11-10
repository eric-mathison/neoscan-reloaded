require("mocha");
require("should");
const DamageType = require("../DamageType");

describe("Calculating Resistances", () => {
    describe("Resisting damage using just a shield on cap", () => {
        let damage, results;
        beforeEach(() => {
            damage = new DamageType("Fire", 100, "Head", 80);
            damage.registerReduction("shield", 20, 80);
            results = [];
            damage.summarise(results);
        });

        it("should give the reduced damage value", () => {
            results[0][0].should.equal("20.00".red);
        });

        it("should give the total damage value", () => {
            results[0][1].should.equal("100.00".red);
        });

        it("should give the total reduction", () => {
            results[0][2].should.equal("80.00 (80.00%)".red);
        });

        it("should give the damage type", () => {
            results[0][3].should.equal("Fire".red);
        });

        it("should give the hit zone", () => {
            results[0][4].should.equal("Head".red);
        });

        it("should give the resistance breakdown", () => {
            results[0][5].should.equal("shield 80.00 (80%)".cyan);
        });

        it("should give the resistance capped state", () => {
            console.log(results);
            results[0][6].should.equal("true (80%)");
        });
    });
});
