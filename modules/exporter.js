class Attribute {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class Sheet {
    constructor(name, description, image, attributes) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.attributes = attributes;
    }
}

/**
 *
 * @returns {Sheet}
 * @private
 */
function _parse() {
    const sheet = new Sheet();

    sheet.name = document.getElementById("in_name").value;
    sheet.description = document.getElementById("in_description").value;
    sheet.image = document.getElementById("in_image").files[0];

    // attributes
    sheet.attributes = [];
    let attribute_keys = document.querySelectorAll(".in-attribute-key");
    let attribute_values = document.querySelectorAll(".in-attribute-value");
    for (let i = 0; i < attribute_values.length; ++i) {
        const key = attribute_keys[i].value;
        const value = attribute_values[i].value;

        let a = new Attribute(key, value);
        sheet.attributes.push(a);
    }

    return sheet;
}

/**
 *
 * @param sheet
 * @returns {Node}
 * @private
 */
function _display(sheet) {
    const template = document.getElementById("t-export");
    const elem = template.content.cloneNode(true);

    // name
    const nameElem = elem.querySelector(".export-name");
    nameElem.innerHTML = sheet.name;

    // description
    const descriptionElem = elem.querySelector(".export-description");
    descriptionElem.innerHTML = sheet.description;

    // image todo
    // const imageElem = elem.querySelector(".export-image");
    // imageElem.src = sheet.description;

    // attributes
    const attributesContainer = elem.querySelector(".export-attributes");
    sheet.attributes.forEach(attribute => {
        const aTemplate = document.getElementById("t-export-attribute");
        const clone = aTemplate.content.cloneNode(true);

        // const container = clone.querySelector(".attribute-container");

        const keyElem = clone.querySelector(".attribute-key");
        keyElem.innerHTML = attribute.key;
        // container.appendChild(keyElem);

        const valueElem = clone.querySelector(".attribute-value");
        valueElem.innerHTML = attribute.value;
        // container.appendChild(valueElem);

        // clone.appendChild(container);

        attributesContainer.appendChild(clone);
    });
    // for (let i = 0; i < sheet.attributes.length; ++i) {
    // }

    elem.appendChild(attributesContainer);

    return elem;
}

/**
 *
 * @param elem
 */
function _save_fo_file(elem) {
    html2canvas(elem).then(function(canvas) {
        // source https://stackoverflow.com/a/58652379/11186407
        let downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', 'CanvasAsImage.png');

        canvas.toBlob(function(blob) {
            let url = URL.createObjectURL(blob);
            downloadLink.setAttribute('href', url);
            downloadLink.click();
        });
    });
}

/**
 *
 * @private
 */
export function exportSheet() {
    // parse input
    const input = _parse();

    // display result
    const elem = _display(input);

    // we need to render the canvas before we can hide it
    const exp = document.getElementById("export");
    exp.innerHTML = null;
    exp.appendChild(elem);
    _save_fo_file(exp);
}
