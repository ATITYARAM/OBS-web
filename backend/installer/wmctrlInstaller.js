const { commandExists } = require("../utils/system");

function ensureWMCTRL() {

    console.log("");
    console.log("Checking wmctrl...");
    console.log("");

    if (commandExists("wmctrl")) {

        console.log("✓ wmctrl Installed");

        return true;

    }

    console.log("❌ wmctrl is not installed.");
    console.log("");
    console.log("Install using:");
    console.log("");
    console.log("sudo apt install wmctrl");
    console.log("");

    return false;

}

module.exports = {

    ensureWMCTRL

};
