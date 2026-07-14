const config =
require("./config");
const { obsInitialized } = require("./setup/workspaceManager");
const { ensureOBSWorkspace } = require("./setup/workspaceManager");
const { ensureOBS } = require("./managers/obsManager");
const { connectOBS } = require("./obs");
const { ensureScenes } = require("./managers/sceneManager");
const { ensureSources } = require("./managers/sourceManager");
const { ensureApplications } = require("./managers/applicationManager");
const { inputExists, createWindowCapture } = require("./managers/inputManager");
const { ensureWindowCapturers } = require("./managers/windowCaptureManager");

async function main() {

    try {

        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log(" Classroom Controller");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

	if (!obsInitialized()) {

	console.log("");
	console.log("First OBS startup detected.");
	console.log("Initializing OBS...");
	console.log("");

	await ensureOBS();

	}

	await ensureOBSWorkspace();

	await ensureOBS();

        console.log("");

        console.log("Checking scenes...");

        await ensureScenes(config.scenes);

 	await ensureApplications(config.applications);

	await ensureWindowCapturers( config.applications );

	await ensureSources(config.scenes);

	console.log("");
	console.log("Checking Inputs...");

	const input = await inputExists("TNE Books");

	if (input) {

	    console.log("✅ TNE Books input exists");

	} else {

	console.log("Creating TNE Books input...");

	await createWindowCapture("TNE Books");

	console.log("✅ Created");

	}

        console.log("");

        console.log("✅ Classroom Ready");

    } catch (err) {

        console.error(err);

    }

    process.exit();

}

main();
