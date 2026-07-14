const { spawn, execSync } = require("child_process");

function wait(ms) {

    return new Promise(resolve =>

        setTimeout(resolve, ms)

    );

}

async function waitForFirefoxWindow() {

    while (true) {

        try {

            const windows = execSync(

                "wmctrl -lx"

            ).toString();

            if (

                windows.includes(
                    "Navigator.firefox_firefox"
                )

            ) {

                break;

            }

        } catch {}

        await wait(500);

    }

    await wait(2000);

}

async function ensureApplications(applications) {

    console.log("");
    console.log("Checking Applications...");
    console.log("");

    for (const app of applications) {

        console.log(`Launching ${app.id}...`);

        const command = app.command[0];
        const args = app.command.slice(1);

        spawn(command, args, {

            detached: true,
            stdio: "ignore"

        }).unref();

        console.log(`✓ ${app.id} launched`);

    }

    console.log("");
    console.log("Waiting for Firefox...");

    await waitForFirefoxWindow();

    console.log("✓ Firefox Ready");

}

module.exports = {

    ensureApplications

};
