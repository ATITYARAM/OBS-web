const { spawn } = require("child_process");

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

}

module.exports = {
    ensureApplications
};
