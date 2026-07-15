const runtime =
    require("../runtime/runtime");

async function ensureApplications(applications) {

    console.log("");
    console.log("Checking Applications...");
    console.log("");

    for (const app of applications) {

        console.log(`Launching ${app.id}...`);

        runtime
            .launchApplication(app)
            .unref();

        console.log(`✓ ${app.id} launched`);

    }

}

module.exports = {

    ensureApplications

};
