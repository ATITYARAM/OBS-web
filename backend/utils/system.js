const { execSync } = require("child_process");

function commandExists(command) {

    try {

        execSync(`which ${command}`, {
            stdio: "ignore"
        });

        return true;

    }

    catch {

        return false;

    }

}

function run(command) {

    execSync(command, {

        stdio: "inherit"

    });

}

function runSilent(command) {

    execSync(command, {

        stdio: "ignore"

    });

}

module.exports = {

    commandExists,

    run,

    runSilent

};
