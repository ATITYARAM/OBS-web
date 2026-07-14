const { exec } = require("child_process");

function getWindows() {

    return new Promise((resolve, reject) => {

        exec("wmctrl -lx", (err, stdout) => {

            if (err)
                return reject(err);

            const windows = stdout
                .trim()
                .split("\n")
                .filter(Boolean)
                .map(line => {

                    const parts = line.trim().split(/\s+/);

			return {

			    id: parts[0],

			    idDecimal: parseInt(parts[0], 16).toString(),

			    desktop: parts[1],

			    app: parts[2],

			    appName: parts[2].split(".")[0],

			    user: parts[3],

			    title: parts.slice(4).join(" ")


                    };

                });

            resolve(windows);

        });

    });

}

function findWindow(title) {

    return getWindows().then(windows => {

        return windows.find(window =>
            window.title
                .toLowerCase()
                .includes(title.toLowerCase())
        );

    });

}

module.exports = {

    getWindows,

    findWindow

};
