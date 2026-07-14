const {
    ensureFlatpak
} = require("./installer/flatpakInstaller");

const {
    ensureOBS
} = require("./installer/obsInstaller");

const {
    ensureWMCTRL
} = require("./installer/wmctrlInstaller");

function main() {

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(" Classroom Installer");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    ensureFlatpak();

    ensureOBS();

    ensureWMCTRL();

    console.log("");
    console.log("✓ Installation Check Complete");

}

main();
