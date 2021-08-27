function set_style_url(url) {
    let meta = document.getElementById("setting-stylesheet");
    meta.href = url;
}

function set_style_content(style) {
    let container = document.getElementById("setting-style-container");
    container.innerHTML = style;
}

function reset_style() {
    set_style_url(null);
    set_style_content(null);
}

function changeStyle() {
    let choice = document.getElementById("input-style").value;
    switch (choice) {
        case "custom":
            let file = document.getElementById("input-style-file").files[0];
            if (!file) {
                alert("You need to upload a JSON-File, which defines all Attributes.\n\n" +
                    "For more information on how to create a valid setting-JSON-File " +
                    "have a look at the Documentation: https://github.com/mobergmann/tabletop-rpg-enemy-exporter")
                return;
            }

            reset_style();

            // set style to file content
            let reader = new FileReader();
            reader.onload = function () {
                let content = reader.result;
                set_style_content(content);
            }
            reader.readAsText(file);

            break;

        default:
            reset_style();
            let url = "themes/" + choice + ".css";
            set_style_url(url);
            break;
    }
}


export {changeStyle}
