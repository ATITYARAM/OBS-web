const { connectOBS } = require("./obs");

const {
    bindWindowCapture
} = require("./managers/inputManager");

const {
    findWindow
} = require("./desktop/desktopManager");

(async () => {

    await connectOBS();

    const window =
        await findWindow("Tamil Nadu");

    await bindWindowCapture(
        "TNE Books",
        window
    );

    console.log("✅ Bound");

})();
