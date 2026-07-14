const fs = require("fs");
const path = require("path");

const { getOBSConfig } =
    require("./utils/obsConfig");

const obs = getOBSConfig();

const ROOT =
    process.env.HOME +
    "/.var/app/com.obsproject.Studio/config/obs-studio";

function copy(src, dst) {

    fs.rmSync(dst, {

        recursive: true,
        force: true

    });

    fs.cpSync(src, dst, {

        recursive: true

    });

}

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(" Save Classroom Template");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("");

console.log("Saving Profile...");

copy(

    path.join(

        ROOT,
        "basic",
        "profiles",
        obs.profileDir

    ),

    path.join(

        process.cwd(),
        "templates",
        "profile",
        obs.profileDir

    )

);

console.log("✓ Profile Saved");

console.log("");

console.log("Saving Scene Collection...");

copy(

    path.join(

        ROOT,
        "basic",
        "scenes",
        obs.sceneCollectionFile

    ),

    path.join(

        process.cwd(),
        "templates",
        "scenes",
        obs.sceneCollectionFile

    )

);

console.log("✓ Scene Collection Saved");

console.log("");

console.log("Saving WebSocket Config...");

copy(

    path.join(

        ROOT,
        "plugin_config",
        "obs-websocket",
        "config.json"

    ),

    path.join(

        process.cwd(),
        "templates",
        "websocket",
        "config.json"

    )

);

console.log("✓ WebSocket Config Saved");

console.log("");
console.log("✅ Template Updated");
