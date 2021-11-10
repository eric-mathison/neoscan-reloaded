const prompts = require("prompts");
const app = require("./app");

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
            { title: "Piercing", value: "piercing" },
            { title: "Force", value: "force" },
            { title: "Fire", value: "fire" },
            { title: "Poison", value: "poison" },
            { title: "Energy", value: "energy" },
            { title: "Xray", value: "xray" },
        ],
        max: 7,
        hint: "- Space to select. Return to submit",
    },
];

(async () => {
    const response = await prompts(questions);
    app(response["characterName"], response["mode"], response["options"]);
})();
