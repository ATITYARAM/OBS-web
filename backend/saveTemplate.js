const fs = require("fs");
const path = require("path");

const ROOT =
    process.env.HOME +
    "/.var/app/com.obsproject.Studio/config/obs-studio";

function fileSize(file) {

    return fs.statSync(file).size;

}

function sameContent(src, dst) {

    if (!fs.existsSync(dst)) {

        return false;

    }

    return fs.readFileSync(src).equals(

        fs.readFileSync(dst)

    );

}

function copy(src, dst) {

    console.log(`Source      : ${src}`);
    console.log(`Destination : ${dst}`);

    if (!fs.existsSync(src)) {

        throw new Error(`Source not found:\n${src}`);

    }

    const isDirectory =
        fs.statSync(src).isDirectory();

    if (isDirectory) {

        console.log("Type        : Directory");

        fs.rmSync(dst, {

            recursive: true,
            force: true

        });

        fs.cpSync(src, dst, {

            recursive: true

        });

        console.log("Status      : COPIED");

        return;

    }

    const existed =
        fs.existsSync(dst);

    const identical =
        existed &&
        fs.readFileSync(src).equals(
            fs.readFileSync(dst)
        );

    if (existed) {

        console.log(
            `Old Size    : ${fs.statSync(dst).size} bytes`
        );

    }

    console.log(
        `New Size    : ${fs.statSync(src).size} bytes`
    );

    fs.rmSync(dst, {

        recursive: true,
        force: true

    });

    fs.cpSync(src, dst);

    if (!existed) {

        console.log("Status      : NEW");

    }

    else if (identical) {

        console.log("Status      : UNCHANGED");

    }

    else {

        console.log("Status      : UPDATED");

    }

}

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(" Save Classroom Template");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("");

console.log("Saving Profile...");

copy(

    path.join(
        ROOT,
        "basic",
        "profiles",
        "J"
    ),

    path.join(
        process.cwd(),
        "templates",
        "profile",
        "J"
    )

);

console.log("✓ Profile Saved");
console.log("");

console.log("Saving Scene Collection...");

copy(

    path.join(
        ROOT,
        "basic",
        "scenes",
        "J Classroom.json"
    ),

    path.join(
        process.cwd(),
        "templates",
        "scenes",
        "J Classroom.json"
    )

);

console.log("✓ Scene Collection Saved");
console.log("");

console.log("Saving WebSocket Config...");

copy(

    path.join(
        ROOT,
        "plugin_config",
        "obs-websocket",
        "config.json"
    ),

    path.join(
        process.cwd(),
        "templates",
        "websocket",
        "config.json"
    )

);

console.log("✓ WebSocket Config Saved");

console.log("");
console.log("✅ Template Updated");
