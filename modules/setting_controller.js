import {appendAttributeInput} from "./index_controller.js";

/**
 * source: https://stackoverflow.com/a/35970894/11186407
 * @param url url to the json file
 * @param callback
 */
function get_json(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        let status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
}


function changeSetting() {
    let attribute_container = document.getElementById("in_attributes");
    if (/\S/.test(attribute_container.innerHTML)) {
        if (!confirm("Do you want to append the Setting to the current attributes")) {
            attribute_container.innerHTML = null;
        }
    }



    const setting = document.getElementById("input-setting").value.toLowerCase();

    let config_url;
    if (setting === "default") {
        alert("You can add your own attributes.\nTo use a predefined setting, select one.");
        return;
    }
    else if (setting === "custom") {
        // todo
        let file = null;
        if (!file) {
            alert("Please upload a valid settings config file and try again.\n" +
                "See https://github.com/mobergmann/tabletop-rpg-enemy-exporter for more information.")
        }
        return;
    }
    else {
        config_url = "settings/" + setting + ".json";
    }



    // download config
    get_json(config_url, function(err, data) {
        if (err) {
            alert("An error occurred. Please try again.\n" +
                "If the Problem persists open an issue on GitHub.");
            return;
        }

        // todo parsing
        // const response = JSON.parse(data);

        data.forEach(attribute => {
            appendAttributeInput(attribute);
        });
    });
}



export {changeSetting};
