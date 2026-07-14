const { obs } = require("../obs");

async function ensureScenes(sceneList) {

    const sceneResponse = await obs.call("GetSceneList");

    const existingScenes = sceneResponse.scenes.map(
        scene => scene.sceneName
    );

    for (const scene of sceneList) {

        if (existingScenes.includes(scene.name)) {

            console.log(`✅ Scene exists: ${scene.name}`);

        } else {

            console.log(`➕ Creating scene: ${scene.name}`);

            await obs.call("CreateScene", {
                sceneName: scene.name
            });

            console.log(`✅ Created: ${scene.name}`);

        }

    }

}

module.exports = {
    ensureScenes
};
