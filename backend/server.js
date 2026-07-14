const express = require("express");
const { connectOBS, switchScene } = require("./obs");

const app = express();

app.use(express.static("public"));

connectOBS();

app.get("/scene/:name", async (req, res) => {

    try {

        await switchScene(req.params.name);

        res.send("OK");

    } catch (err) {

        console.log(err);

        res.status(500).send("Failed");
    }

});

app.listen(3000, () => {

    console.log("🚀 Classroom Controller");
    console.log("http://localhost:3000");

});
