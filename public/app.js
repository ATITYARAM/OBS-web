async function changeScene(scene) {

    try {

        const response = await fetch(
            "/scene/" + encodeURIComponent(scene)
        );

        if (response.ok) {

            console.log("Scene changed");

        } else {

            alert("Failed");

        }

    } catch (err) {

        console.error(err);

    }

}
