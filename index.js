const prompts = require("prompts");

const questions = [
    {
        type: "select",
        name: "mode",
        message: "Select a mode",
        choices: [
            { title: "Real-Time", value: "watch" },
            { title: "Scan an Existing Log File", value: "scan" },
        ],
        initial: 0,
    },
    {
        type: "text",
        name: "characterName",
        message: "What is the name of your character?",
    },
    {
        type: "multiselect",
        name: "options",
        message: "Select which options you want to filter out (hide)",
        choices: [
            { title: "Healing", value: "healing" },
            { title: "Piercing", value: "piercing, stich" },
            { title: "Force", value: "force, hieb" },
            { title: "Fire", value: "fire, feuer" },
            { title: "Poison", value: "poison, gift" },
            { title: "Energy", value: "energy, energie" },
            { title: "Xray", value: "xray, strahlung" },
        ],
        max: 7,
        hint: "- Space to select. Return to submit",
    },
];

(async () => {
    const response = await prompts(questions);
    const app = require("./app");
    app(response["characterName"], response["mode"], response["options"]);
})();
