const fs = require("fs");
const path = require("path");
const ini = require("ini");

const ROOT =
    process.env.HOME +
    "/.var/app/com.obsproject.Studio/config/obs-studio";

const PROFILE_NAME = "J";
const SCENE_NAME = "J Classroom";

const TEMPLATE_PROFILE =
    path.join(process.cwd(), "templates/profile/J");

const TEMPLATE_SCENE =
    path.join(
        process.cwd(),
        "templates/scenes/J Classroom.json"
    );

const TEMPLATE_WS =
    path.join(
        process.cwd(),
        "templates/websocket/config.json"
    );

function copyRecursive(src, dst) {

    fs.cpSync(src, dst, {
        recursive: true
    });

}

function ensureProfileFolder() {

    const dst =
        `${ROOT}/basic/profiles/${PROFILE_NAME}`;

    if (!fs.existsSync(dst)) {

        console.log("Creating J profile...");

        copyRecursive(TEMPLATE_PROFILE, dst);

    }
    else {

        console.log("✓ Profile exists");

    }

}

function ensureSceneCollection() {

    const dst =
        `${ROOT}/basic/scenes/${SCENE_NAME}.json`;

    if (!fs.existsSync(dst)) {

        console.log("Creating Scene Collection...");

        fs.copyFileSync(
            TEMPLATE_SCENE,
            dst
        );

    }
    else {

        console.log("✓ Scene Collection exists");

    }

}

function ensureWebSocketConfig() {

    const dst =
        `${ROOT}/plugin_config/obs-websocket/config.json`;

    if (!fs.existsSync(dst)) {

        console.log("Installing WebSocket config...");

        fs.copyFileSync(
            TEMPLATE_WS,
            dst
        );

    }
    else {

        console.log("✓ WebSocket config exists");

    }

}

function selectProfile() {

    const file =
        `${ROOT}/user.ini`;

    const cfg =
        ini.parse(
            fs.readFileSync(file, "utf8")
        );

    cfg.Basic.Profile = PROFILE_NAME;
    cfg.Basic.ProfileDir = PROFILE_NAME;

    cfg.Basic.SceneCollection = SCENE_NAME;
    cfg.Basic.SceneCollectionFile =
        `${SCENE_NAME}.json`;

    fs.writeFileSync(
        file,
        ini.stringify(cfg)
    );

    console.log("✓ Selected J profile");

}

async function ensureOBSWorkspace() {

    console.log("");
    console.log("Preparing OBS Workspace...");
    console.log("");

    ensureProfileFolder();

    ensureSceneCollection();

    ensureWebSocketConfig();

    selectProfile();

}

module.exports = {

    ensureOBSWorkspace

};
