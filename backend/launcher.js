const fs = require("fs");

const config = JSON.parse(
    fs.readFileSync("./config/config.json", "utf8")
);

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

        await connectOBS();

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
