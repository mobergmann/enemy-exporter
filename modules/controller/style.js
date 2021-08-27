function set_style_url(style_url) {
    let export_stylesheet = document.getElementById("setting-stylesheet");
    export_stylesheet.href = style_url;
}

function set_style(css_text) {
    let style_container = document.getElementById("setting-container");
    style_container.innerHTML = css_text;
}

function changeStyle() {
    // reset previously set styles
    set_style_url(null);
    set_style(null);

    let choice = document.getElementById("input-style").value.toLowerCase();
    switch (choice) {
        case "custom":
            // get file from input
            let file = document.getElementById("input-style-file").files[0];
            if (!file) {
                alert("You need to upload a JSON-File, which defines all Attributes.\n\n" +
                    "For more information on how to create a valid setting-JSON-File " +
                    "have a look at the Documentation: https://github.com/mobergmann/tabletop-rpg-enemy-exporter")
                return;
            }

            // set file input as style
            let reader = new FileReader();
            reader.onload = function(e) {
                let contents = e.target.result;
                set_style(contents);
            };
            // read file text
            reader.readAsText(file);

            break;

        default:
            let url = "themes/" + choice + ".css";
            set_style_url(url);
            break;
    }
}


export {changeStyle}
