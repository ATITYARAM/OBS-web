const {
    getWindows,
    findWindow
} = require("./desktop/desktopManager");

(async () => {

    const windows = await getWindows();

    console.table(windows);

    console.log("");

    const tnebooks =
        await findWindow("Tamil Nadu");

    console.log("TNE Books");

    console.log(tnebooks);

    console.log("");

    const whiteboard =
        await findWindow("Whiteboard");

    console.log("Whiteboard");

    console.log(whiteboard);

})();
