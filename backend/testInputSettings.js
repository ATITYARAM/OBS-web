const { obs, connectOBS } = require("./obs");

(async () => {

    await connectOBS();

    const settings = await obs.call("GetInputSettings", {
        inputName: "TNE Books"
    });

    console.dir(settings, { depth: null });

})();
