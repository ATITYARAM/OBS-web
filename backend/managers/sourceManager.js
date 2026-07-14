const { obs } = require("../obs");

async function ensureSources(sceneConfigs) {

    const { inputs } = await obs.call("GetInputList");

    console.log("\n========== OBS Inputs ==========\n");

    for (const input of inputs) {

        console.log(
            `${input.inputName}   (${input.inputKind})`
        );

    }

    console.log("\n===============================\n");

}

module.exports = {
    ensureSources
};

