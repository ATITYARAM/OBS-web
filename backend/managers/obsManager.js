const { obs: config } = require("../config");

const { execSync } = require("child_process");

const runtime = require("../runtime/runtime");

const { connectOBS } = require("../obs");

function commandExists(command) {

    try {

        execSync(`which ${command}`, {
            stdio: "ignore"
        });

        return true;

    }

    catch {

        return false;

    }

}

function detectOBS() {

    // Native OBS

    if (commandExists("obs")) {

        return {

            installed: true,
            type: "apt"

        };

    }

    // Flatpak OBS

    if (commandExists("flatpak")) {

        try {

            execSync(
                "flatpak info com.obsproject.Studio",
                {
                    stdio: "ignore"
                }
            );

            return {

                installed: true,
                type: "flatpak"

            };

        }

        catch {}

    }

    return {

        installed: false,
        type: null

    };

}

function isOBSRunning(type) {

    try {

        if (type === "apt") {

            execSync("pgrep -x obs", {
                stdio: "ignore"
            });

            return true;

        }

        if (type === "flatpak") {

            execSync(
                "flatpak ps | grep com.obsproject.Studio",
                {
                    stdio: "ignore"
                }
            );

            return true;

        }

    }

    catch {

        return false;

    }

}

function launchOBS() {

    console.log("Launching OBS...");

    runtime.launchOBS().unref();

}

function wait(ms) {

    return new Promise(resolve =>

        setTimeout(resolve, ms)

    );

}

async function waitForOBS() {

    console.log("Waiting for OBS WebSocket...");

    for (let i = 1; i <= 30; i++) {

        try {

            await connectOBS();

            console.log("✓ OBS WebSocket Ready");

            return;

        }

        catch {

            process.stdout.write(`Attempt ${i}/30\r`);

            await wait(1000);

        }

    }

    throw new Error("OBS WebSocket did not start.");

}

async function ensureOBS() {

    console.log("");
    console.log("Checking OBS...");
    console.log("");

    const obs = detectOBS();

    if (!obs.installed) {

        console.log("❌ OBS Studio not installed.");
        process.exit(1);

    }

    console.log(`✓ OBS Found (${obs.type})`);

try {

    await connectOBS();

    console.log("✓ OBS already running");

    return;

}
catch {

    console.log("Launching OBS...");

    launchOBS();

    await waitForOBS();

    console.log("✓ OBS Ready");

}

    }

    module.exports = {

    ensureOBS

};
