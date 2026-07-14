const { commandExists } =
    require("../utils/system");

function ensureFlatpak() {

    console.log("");
    console.log("Checking Flatpak...");
    console.log("");

    if (commandExists("flatpak")) {

        console.log("✓ Flatpak Installed");

        return true;

    }

    console.log("❌ Flatpak is not installed.");
    console.log("");
    console.log("Install it using:");
    console.log("");
    console.log("sudo apt update");
    console.log("sudo apt install flatpak");
    console.log("");

    return false;

}

module.exports = {

    ensureFlatpak

};
