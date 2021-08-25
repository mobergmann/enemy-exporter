function changeStyle() {
    let choice = document.getElementById("input-style").value.toLowerCase();
    switch (choice) {
        case "custom":
            let file = document.getElementById("input-style-file").files[0];
            if (!file) {
                alert("You need to upload a JSON-File, which defines all Attributes.\n\n" +
                    "For more information on how to create a valid setting-JSON-File " +
                    "have a look at the Documentation: https://github.com/mobergmann/tabletop-rpg-enemy-exporter")
                return;
            }

            // todo create style element and add css file content
            //  may be harmful

            break;

        default:
            let url = "themes/" + choice + ".css";
            let export_stylesheet = document.getElementById("setting-stylesheet");
            export_stylesheet.href = url;

            // todo remove style element

            break;
    }
}


export {changeStyle}