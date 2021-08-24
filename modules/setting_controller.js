import {appendAttributeInput} from "./index_controller.js";


/**
 * Parsed a json file to an array
 * @param url relative url to the config file
 * @param callback callback function
 * @param error_callback error callback function
 * @private
 */
function _parseWeb(url, callback, error_callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'text';

    // parse file content to array
    xhr.onload = () => {
        let status = xhr.status;
        if (status === 200) {
            try {
                let attributes = JSON.parse(xhr.response);
                callback(attributes);
            } catch (e) {
                error_callback(e.message);
            }
        } else {
            error_callback(xhr.response);
        }
    };

    try {
        xhr.send();
    } catch (e) {
        error_callback(e.message);
    }
}

/**
 * Parsed a json file to an array
 * @param file file content
 * @param callback callback function
 * @param error_callback error callback function
 * @private
 */
function _parseFile(file, callback, error_callback) {
    let reader = new FileReader();

    // parse file content to array
    reader.onload = e => {
        let file_content = e.target.result;

        try {
            let attributes = JSON.parse(file_content);
            callback(attributes);
        } catch (e) {
            error_callback(e.message);
        }
    };

    // read file
    try {
        reader.readAsText(file);
    } catch (e) {
        error_callback(e.message);
    }
}


/**
 * Adds attributes to the attribute list, based
 * on a provided setting option
 */
function changeSetting() {
    // ask if already added attributes should be removed
    let attribute_container = document.getElementById("in_attributes");
    if (/\S/.test(attribute_container.innerHTML)) {
        if (confirm("Do you want to remove all added attributes?")) {
            attribute_container.innerHTML = null;
        }
    }

    let attribute_option = document.getElementById("input-setting").value.toLowerCase();


    let callback = (attribute_array) => {
        attribute_array.forEach(attribute => {
            appendAttributeInput(attribute);
        });
    };

    let error_callback = (error_message) => {
        alert("An error occurred. Please Try again.\n" +
            "If the Problem persists, open an Issue at GitHub.\n\n" +
            error_message);
    };

    // catch special cases
    switch (attribute_option) {

        case "default":
            alert("You should add your own attributes.");
            return;

        case "custom":
            let file = document.getElementById("input-setting-config-file").files[0];
            if (!file) {
                alert("You need to upload a JSON-File, which defines all Attributes.\n\n" +
                    "For more information on how to create a valid setting-JSON-File " +
                    "have a look at the Documentation: https://github.com/mobergmann/tabletop-rpg-enemy-exporter")
                return;
            }

            _parseFile(file, callback, error_callback);
            break;

        default:
            let url = "settings/" + attribute_option + ".json";
            _parseWeb(url, callback, error_callback);
            break;
    }
}


export {changeSetting};
