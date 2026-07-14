const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.join(

    process.env.HOME,

    ".var",

    "app",

    "com.obsproject.Studio",

    "config",

    "obs-studio"

);

console.log("");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(" Reset OBS");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("");

try {

    execSync("pkill obs", {

        stdio: "ignore"

    });

} catch {}

try {

    execSync(

        "pkill -f com.obsproject.Studio",

        {

            stdio: "ignore"

        }

    );

} catch {}

if (fs.existsSync(ROOT)) {

    fs.rmSync(ROOT, {

        recursive: true,

        force: true

    });

    console.log("✓ OBS configuration removed");

}
else {

    console.log("✓ OBS already clean");

}

console.log("");
console.log("Run:");
console.log("");
console.log("npm run launch");
console.log("");
