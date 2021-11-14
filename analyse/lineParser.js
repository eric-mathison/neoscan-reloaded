"use strict";
const Hit = require("../Hit");

module.exports = function createParser() {
    const newTypeRegex = new RegExp(
        /Damage:\s(\-?[0-9]+\.[0-9]+)\sTarget\s([\w\-\s]+)\sHitZone\s([0-3])/
    );
    const newHitRegex = new RegExp(/Local Player:Damage/);
    const newReductionRegex = new RegExp(
        /Damage:\s([0-9]+\.[0-9]+)\s\(Reduction: ([0-9]+\.[0-9]+)\s\-\s([0-9]+\.[0-9]+)\sPercentage\)\s\-[\w\s]+(armor|skills|shield)/
    );
    const newResistanceCapRegex = new RegExp(
        /Results of this target: .* - ResistanceCap:\s([0-9]+\.[0-9]+)!/
    );
    let currentHit = new Hit();
    let type = "";

    function typeIsFilteredOut(type, options) {
        return options.reduce(
            (result, filter) => result || filter.includes(type.toLowerCase()),
            false
        );
    }

    return {
        parse: function (options, line) {
            if (line.startsWith("Character System: Acceleration ")) return;
            // console.log("reading line: ", line);
            if (newHitRegex.test(line)) {
                // console.log("hit");
                currentHit.close();
                currentHit = new Hit();
                currentHit.setTimeout();
                return;
            }

            const newType = newTypeRegex.exec(line);
            if (newType && newType.length) {
                // console.log("newtype");
                const damage = parseFloat(newType[1]);
                type = newType[2];
                if (damage < 0) type = "Healing";
                let zone = newType[3];
                switch (zone) {
                    case "0": {
                        zone = "Head";
                        break;
                    }
                    case "1": {
                        zone = "Torso";
                        break;
                    }
                    case "2": {
                        zone = "Legs";
                        break;
                    }
                    default: {
                        zone = "Full";
                    }
                }
                if (typeIsFilteredOut(type, options)) return;
                // console.log("newtype: closingType");
                currentHit.closeType();
                // console.log("registering damage type");
                currentHit.registerType(type, damage, zone);
                return;
            }

            const newReduction = newReductionRegex.exec(line);
            if (newReduction && newReduction.length) {
                if (typeIsFilteredOut(type, options)) return;
                const damageAfterReduction = parseFloat(newReduction[1]);
                const ongoingTotalReduction = parseFloat(newReduction[2]);
                const ongoingTotalPercentage = parseFloat(newReduction[3]);
                const reductionSource = newReduction[4];
                // console.log("adding new reduction");
                currentHit.reduceType(
                    reductionSource,
                    damageAfterReduction,
                    ongoingTotalPercentage
                );
                return;
            }

            const resistCap = newResistanceCapRegex.exec(line);
            if (resistCap && resistCap.length) {
                const cap = resistCap[1];
                currentHit.capType(cap);
                return;
            }
        },
        dumb: function (line) {
            if (line.startsWith("Character System: Acceleration ")) return;
            console.log(line);
        },
    };
};
