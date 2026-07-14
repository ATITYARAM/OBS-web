const { OBSWebSocket } = require("obs-websocket-js");

const { obs: config } = require("./config");

const obs = new OBSWebSocket();

async function connectOBS() {

    await obs.connect(

        `ws://${config.host}:${config.port}`,

        config.password

    );

    console.log("✅ Connected to OBS");

}

async function switchScene(sceneName) {

    await obs.call("SetCurrentProgramScene", {
        sceneName
    });

    console.log(`🎬 Switched to: ${sceneName}`);

}

module.exports = {

    obs,

    connectOBS,

    switchScene

};
