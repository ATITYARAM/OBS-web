const fs = require("fs");

const CONFIG =
process.env.HOME +
"/.var/app/com.obsproject.Studio/config/obs-studio/plugin_config/obs-websocket/config.json";

function configureWebSocket(port,password){

    const config = JSON.parse(
        fs.readFileSync(CONFIG,"utf8")
    );

    config.server_enabled = true;
    config.server_port = port;
    config.server_password = password;
    config.auth_required = true;

    fs.writeFileSync(
        CONFIG,
        JSON.stringify(config,null,2)
    );

    console.log("✓ WebSocket configured");
}

module.exports = {

    configureWebSocket

};
