function title(text) {

    console.log("");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(` ${text}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

}

function section(text) {

    console.log("");
    console.log(text);
    console.log("");

}

function success(text) {

    console.log(`✓ ${text}`);

}

function error(text) {

    console.log(`❌ ${text}`);

}

function info(text) {

    console.log(text);

}

module.exports = {

    title,

    section,

    success,

    error,

    info

};
