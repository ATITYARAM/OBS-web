const { OBSWebSocket } = require("obs-websocket-js");
const fs = require("fs");

const config = JSON.parse(
    fs.readFileSync("./config/config.json", "utf8")
);

const obs = new OBSWebSocket();

async function connectOBS() {
    await obs.connect(
        `ws://${config.obs.host}:${config.obs.port}`,
        config.obs.password
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
