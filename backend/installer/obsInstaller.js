const { runSilent } =
    require("../utils/system");


function obsInstalled() {

    try {

	runSilent(
            "flatpak info com.obsproject.Studio",
            {
                stdio: "ignore"
            }
        );

        return true;

    }

    catch {

        return false;

    }

}

function ensureOBS() {

    console.log("");
    console.log("Checking OBS Studio...");
    console.log("");

    if (obsInstalled()) {

        console.log("✓ OBS Studio Installed");

        return true;

    }

    console.log("❌ OBS Studio not installed.");
    console.log("");

    console.log("Install using:");

    console.log("");

    console.log(
        "flatpak install flathub com.obsproject.Studio"
    );

    console.log("");

    return false;

}

module.exports = {

    ensureOBS

};
