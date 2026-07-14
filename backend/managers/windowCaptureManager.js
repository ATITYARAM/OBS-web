const { findWindow } =
require("../desktop/desktopManager");

const {
    inputExists,
    createWindowCapture,
    bindWindowCapture
} = require("./inputManager");

async function ensureWindowCapturers(applications) {

    console.log("");
    console.log("Checking Window Captures...");
    console.log("");

    for (const app of applications) {

        console.log(`Application : ${app.id}`);

        let input =
            await inputExists(app.source);

        if (!input) {

            console.log("Creating Input...");

            await createWindowCapture(
                app.source,
                app.scene
            );

        }
        else {

            console.log("Input Exists");

        }

        const window =
            await findWindow(app.windowSearch);

        if (!window) {

            console.log("Window not found");
            continue;

        }

        console.log("Binding Window...");

        await bindWindowCapture(
            app.source,
            window
        );

        console.log("Done\n");

    }

}

module.exports = {

    ensureWindowCapturers

};
