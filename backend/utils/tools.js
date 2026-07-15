const path = require("path");

const ROOT = process.cwd();

const TOOLS = path.join(ROOT, "tools");

module.exports = {

    root: TOOLS,

    bin: path.join(TOOLS, "bin"),

    apps: path.join(TOOLS, "apps"),

    cache: path.join(TOOLS, "cache"),

    downloads: path.join(TOOLS, "downloads"),

    logs: path.join(TOOLS, "logs"),

    runtime: path.join(TOOLS, "runtime"),

    tmp: path.join(TOOLS, "tmp"),

    node: path.join(TOOLS, "bin", "node"),

    npm: path.join(TOOLS, "bin", "npm"),

    obs: path.join(TOOLS, "bin", "obs"),

    firefox: path.join(TOOLS, "bin", "firefox"),

    wmctrl: path.join(TOOLS, "bin", "wmctrl")

};
