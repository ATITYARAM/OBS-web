const { spawn } = require("child_process");

const tools = require("../utils/tools");

function launch(command, args = [], options = {}) {

    return spawn(

        command,

        args,

        {

            detached: true,

            stdio: "ignore",

            ...options

        }

    );

}

function launchOBS() {

    return launch(tools.obs);

}

function launchFirefox(args = []) {

    return launch(

        tools.firefox,

        args

    );

}

function launchNode(args = []) {

    return launch(

        tools.node,

        args

    );

}

function launchWMCTRL(args = []) {

    return launch(

        tools.wmctrl,

        args,

        {

            detached: false,

            stdio: "pipe"

        }

    );

}

function launchApplication(app) {

    return launch(

        app.command[0],

        app.command.slice(1)

    );

}

module.exports = {

    launch,

    launchApplication,

    launchOBS,

    launchFirefox,

    launchNode,

    launchWMCTRL

};
