const fs = require("fs");
const path = require("path");
const ini = require("ini");

const ROOT =
    process.env.HOME +
    "/.var/app/com.obsproject.Studio/config/obs-studio";

function getOBSConfig() {

    const cfg = ini.parse(

        fs.readFileSync(

            path.join(ROOT, "user.ini"),
            "utf8"

        )

    );

    return {

        profile: cfg.Basic.Profile,

        profileDir: cfg.Basic.ProfileDir,

        sceneCollection: cfg.Basic.SceneCollection,

        sceneCollectionFile: cfg.Basic.SceneCollectionFile

    };

}

module.exports = {

    getOBSConfig

};
