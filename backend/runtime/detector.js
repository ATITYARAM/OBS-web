const { execSync } = require("child_process");

const tools = require("../utils/tools");

function exists(file) {

    try {

        execSync(

            `${file} --version`,

            {

                stdio: "ignore"

            }

        );

        return true;

    }

    catch {

        return false;

    }

}

function hasNode() {

    return exists(tools.node);

}

function hasFirefox() {

    return exists(tools.firefox);

}

function hasWMCTRL() {

    return exists(tools.wmctrl);

}

function hasOBS() {

    return exists(tools.obs);

}

module.exports = {

    exists,

    hasNode,

    hasFirefox,

    hasWMCTRL,

    hasOBS

};
