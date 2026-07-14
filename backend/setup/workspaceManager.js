const fs = require("fs");
const path = require("path");
const ini = require("ini");
const { execSync } = require("child_process");

const { workspace } = require("../config");

const ROOT =
    process.env.HOME +
    "/.var/app/com.obsproject.Studio/config/obs-studio";

const PROFILE_NAME = workspace.profile;
const SCENE_NAME = workspace.sceneCollection;

const TEMPLATE_PROFILE =
    path.join(
        process.cwd(),
        "templates",
        "profile",
        PROFILE_NAME
    );

const TEMPLATE_SCENE =
    path.join(
        process.cwd(),
        "templates",
        "scenes",
        `${SCENE_NAME}.json`
    );

const TEMPLATE_WS =
    path.join(
        process.cwd(),
        "templates",
        "websocket",
        "config.json"
    );

function obsInitialized() {

    return fs.existsSync(

        path.join(
            ROOT,
            "user.ini"
        )

    );

}

function wait(ms) {

    return new Promise(resolve =>

        setTimeout(resolve, ms)

    );

}

async function waitForInitialization() {

    while (

        !fs.existsSync(path.join(ROOT, "user.ini")) ||

        !fs.existsSync(
            path.join(
                ROOT,
                "plugin_config",
                "obs-websocket",
                "config.json"
            )
        ) ||

        !fs.existsSync(
            path.join(
                ROOT,
                "basic",
                "profiles"
            )
        ) ||

        !fs.existsSync(
            path.join(
                ROOT,
                "basic",
                "scenes"
            )
        )

    ) {

        await wait(1000);

    }

}

async function closeOBS() {

    try {

        execSync("pkill obs");

    } catch {}

    try {

        execSync("pkill -f com.obsproject.Studio");

    } catch {}

    await wait(2000);

}

function copyRecursive(src, dst) {

    fs.cpSync(src, dst, {

        recursive: true

    });

}

function installProfile() {

    const dst =
        path.join(
            ROOT,
            "basic",
            "profiles",
            PROFILE_NAME
        );

    console.log("Installing Profile...");

    fs.rmSync(

        dst,

        {

            recursive: true,

            force: true

        }

    );

    fs.mkdirSync(

        path.dirname(dst),

        {

            recursive: true

        }

    );

    copyRecursive(

        TEMPLATE_PROFILE,

        dst

    );

}

function installSceneCollection() {

    const dst =
        path.join(
            ROOT,
            "basic",
            "scenes",
            `${SCENE_NAME}.json`
        );

    console.log("Installing Scene Collection...");

    fs.mkdirSync(

        path.dirname(dst),

        {

            recursive: true

        }

    );

    fs.rmSync(

        dst,

        {

            force: true

        }

    );

    fs.copyFileSync(

        TEMPLATE_SCENE,

        dst

    );

}

function installWebSocketConfig() {

    const dst =
        path.join(
            ROOT,
            "plugin_config",
            "obs-websocket",
            "config.json"
        );

    console.log("Installing WebSocket Config...");

    fs.mkdirSync(

        path.dirname(dst),

        {

            recursive: true

        }

    );

    fs.rmSync(

        dst,

        {

            force: true

        }

    );

    fs.copyFileSync(

        TEMPLATE_WS,

        dst

    );

}

function selectProfile() {

    const file =
        path.join(
            ROOT,
            "user.ini"
        );

    const cfg =
        ini.parse(

            fs.readFileSync(

                file,

                "utf8"

            )

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

    console.log("✓ Selected Profile");

}

async function ensureOBSWorkspace() {

    console.log("");
    console.log("Preparing OBS Workspace...");
    console.log("");

    installProfile();

    installSceneCollection();

    installWebSocketConfig();

    selectProfile();

    console.log("✓ Workspace Ready");

}

module.exports = {

    ensureOBSWorkspace,

    obsInitialized,

    waitForInitialization,

    closeOBS

};
