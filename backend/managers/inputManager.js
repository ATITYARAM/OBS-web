const { obs } = require("../obs");

async function listInputs() {

    const { inputs } = await obs.call("GetInputList");

    return inputs;

}

async function inputExists(name) {

    const inputs = await listInputs();

    return inputs.find(i => i.inputName === name);

}

async function createWindowCapture(name, scene) {

    await obs.call("CreateInput", {

        sceneName: scene,

        inputName: name,

        inputKind: "xcomposite_input",

        inputSettings: {},

        sceneItemEnabled: true

    });

}

async function bindWindowCapture(inputName, window) {

    await obs.call("SetInputSettings", {

        inputName,

        inputSettings: {

            capture_window:
                `${window.idDecimal}\r\n` +
                `${window.title}\r\n` +
                `${window.appName}`

        },

        overlay: true

    });

}

module.exports = {

    listInputs,

    inputExists,

    createWindowCapture,

    bindWindowCapture

};
