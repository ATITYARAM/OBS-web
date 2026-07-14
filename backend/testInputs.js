const { obs, connectOBS } = require("./obs");

(async () => {

    await connectOBS();

    const { inputs } =
        await obs.call("GetInputList");

    console.table(inputs);

})();
