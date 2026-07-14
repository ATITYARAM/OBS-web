const fs = require("fs");
const os = require("os");
const path = require("path");

function websocketConfigFile() {

    return path.join(

        os.homedir(),

        ".config",

        "obs-studio",

        "plugin_config",

        "obs-websocket",

        "config.json"

    );

}

function ensureWebSocket(config) {

    const file = websocketConfigFile();

    const folder = path.dirname(file);

    fs.mkdirSync(folder, {

        recursive: true

    });

    let changed = false;

    let settings = {};

    if (fs.existsSync(file)) {

        settings = JSON.parse(

            fs.readFileSync(file, "utf8")

        );

    }

    if (settings.server_enabled !== true) {

        settings.server_enabled = true;

        changed = true;

    }

    if (settings.server_port !== config.obs.port) {

        settings.server_port = config.obs.port;

        changed = true;

    }

    if (settings.server_password !== config.obs.password) {

        settings.server_password = config.obs.password;

        changed = true;

    }

    if (changed) {

        fs.writeFileSync(

            file,

            JSON.stringify(settings, null, 4)

        );

    }

    return changed;

}

module.exports = {

    ensureWebSocket

};
