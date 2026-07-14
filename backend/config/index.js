const fs = require("fs");
const path = require("path");

function load(name) {

    return JSON.parse(

        fs.readFileSync(

            path.join(
                process.cwd(),
                "config",
                `${name}.json`
            ),

            "utf8"

        )

    );

}

module.exports = {

    obs: load("obs"),

    workspace: load("workspace"),

    applications: load("applications"),

    scenes: load("scenes")

};
