const { execSync } = require("child_process");

function wait(ms) {

    return new Promise(

        resolve =>

            setTimeout(resolve, ms)

    );

}

function killOBS() {

    try {

        execSync("pkill obs");

    }

    catch {}

    try {

        execSync("pkill -f com.obsproject.Studio");

    }

    catch {}

}

function isOBSRunning() {

    try {

        execSync(

            "flatpak ps | grep com.obsproject.Studio",

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

module.exports = {

    wait,

    killOBS,

    isOBSRunning

};
