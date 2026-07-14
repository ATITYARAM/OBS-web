const fs = require("fs");
const path = require("path");

const { workspace } = require("../config");

const ROOT =
    process.env.HOME +
    "/.var/app/com.obsproject.Studio/config/obs-studio";

function profileExists() {

    return fs.existsSync(

        path.join(
            ROOT,
            "basic",
            "profiles",
            workspace.profile
        )

    );

}

function sceneCollectionExists() {

    return fs.existsSync(

        path.join(
            ROOT,
            "basic",
            "scenes",
            workspace.sceneCollection + ".json"
        )

    );

}

function copyFolder(src, dst) {

    fs.cpSync(src, dst, {

        recursive: true

    });

}

function installTemplate() {

    console.log("");
    console.log("Checking Classroom Workspace...");
    console.log("");

    if (!profileExists()) {

        console.log("Installing J Profile...");

        copyFolder(

            path.join(
                process.cwd(),
                "templates",
                "profile",
                "J"
            ),

            path.join(
                ROOT,
                "basic",
                "profiles",
                "J"
            )

        );

    }
    else {

        console.log("✓ Profile already installed");

    }

    if (!sceneCollectionExists()) {

        console.log("Installing Scene Collection...");

        fs.copyFileSync(

            path.join(
                process.cwd(),
                "templates",
                "scenes",
                "J Classroom.json"
            ),

            path.join(
                ROOT,
                "basic",
                "scenes",
                "J Classroom.json"
            )

        );

    }
    else {

        console.log("✓ Scene Collection already installed");

    }

}

module.exports = {

    profileExists,

    sceneCollectionExists,

    installTemplate

};
