"use strict";
const colors = require("colors");

module.exports = function (description, baseDamageAmount, zone, resistCap) {
    const reductionColours = {
        shield: "cyan",
        armor: "green",
        skills: "yellow",
    };
    const typeColours = {
        Piercing: "white",
        Stich: "white",
        Force: "grey",
        Hieb: "grey",
        Fire: "red",
        Feuer: "red",
        Energy: "bgBlue",
        Energie: "bgBlue",
        "X-ray": "cyan",
        "X-Ray": "cyan",
        Strahlung: "cyan",
        Poison: "green",
        Gift: "green",
        Healing: "yellow",
        Heilung: "yellow",
    };
    const reductions = [];
    let cap = resistCap || 0;
    return {
        registerReduction: function (
            source,
            damageAfterReduction,
            totalPercentage
        ) {
            reductions.push({
                source: source,
                damageAfterReduction: damageAfterReduction,
            });
        },
        setCap: function (resistCap) {
            cap = resistCap * 100;
        },
        summarise: function (table) {
            reductions.reduce((lastReduction, reduction) => {
                const damageAfterThisReduction =
                    lastReduction - reduction.damageAfterReduction;
                reduction.reducedDamageBy = damageAfterThisReduction;
                return reduction.damageAfterReduction;
            }, baseDamageAmount);

            const reducedDamage = reductions.reduce(
                (total, reduction) => total + reduction.reducedDamageBy,
                0
            );

            // console.log(reductions);

            const reductionsMessage = reductions
                .map((reduction) => {
                    return `${
                        reduction.source
                    } ${reduction.reducedDamageBy.toFixed(2)} (${(
                        (reduction.reducedDamageBy / baseDamageAmount) *
                        100
                    ).toFixed(0)}%)`[reductionColours[reduction.source]];
                })
                .join(" ");

            reductions.map((reduction) => {
                return {
                    source: reduction.source,
                    total_reduction: reduction.reducedDamageBy.toFixed(2),
                    percentage: (
                        (reduction.reducedDamageBy / reducedDamage) *
                        100
                    ).toFixed(0),
                };
            });
            table.push([
                `${(baseDamageAmount - reducedDamage).toFixed(2)}`[
                    typeColours[description]
                ] || `${(baseDamageAmount - reducedDamage).toFixed(2)}`,
                `${baseDamageAmount.toFixed(2)}`[typeColours[description]] ||
                    `${baseDamageAmount.toFixed(2)}`,
                `${reducedDamage.toFixed(2)} (${(
                    (reducedDamage / baseDamageAmount) *
                    100
                ).toFixed(2)}%)`[typeColours[description]] ||
                    `${reducedDamage.toFixed(2)} (${(
                        (reducedDamage / baseDamageAmount) *
                        100
                    ).toFixed(2)}%)`,
                `${description}`[typeColours[description]] || `${description}`,
                `${zone}`[typeColours[description]] || `${zone}`,
                reductionsMessage,
                `${
                    (reducedDamage / baseDamageAmount) * 100 >= cap
                        ? "true"
                        : "false"
                } (${cap.toFixed(0)}%)`,
            ]);
        },
    };
};
