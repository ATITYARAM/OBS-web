const log = require("./utils/logger");

const {
    ensureFlatpak
} = require("./installer/flatpakInstaller");

const {
    ensureOBS
} = require("./installer/obsInstaller");

log.title("Classroom Installer");

if (!ensureFlatpak()) {

    process.exit(1);

}

if (!ensureOBS()) {

    process.exit(1);

}

console.log("");
log.success("Installation Check Complete");
