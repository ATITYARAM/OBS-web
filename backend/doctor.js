const { ensureFlatpak } =
    require("./installer/flatpakInstaller");

const { ensureOBS } =
    require("./installer/obsInstaller");

const { ensureWMCTRL } =
    require("./installer/wmctrlInstaller");

async function main() {

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(" Classroom Doctor");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    ensureFlatpak();

    ensureOBS();

    ensureWMCTRL();

    console.log("");
    console.log("✓ System Ready");

}

main();
