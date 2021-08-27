class Attribute {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class Other {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class Sheet {
    constructor(name, description, image, attributes, others) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.attributes = attributes;
        this.others = others;
    }
}

function readInput() {
    const sheet = new Sheet();

    sheet.name = document.getElementById("in_name").value;
    sheet.description = document.getElementById("in_description").value;
    sheet.image = document.getElementById("in_image").files[0];

    // attributes
    sheet.attributes = [];
    let attribute_keys = document.querySelectorAll(".in-attribute-key");
    let attribute_values = document.querySelectorAll(".in-attribute-value");
    for (let i = 0; i < attribute_keys.length; ++i) {
        const key = attribute_keys[i].value;
        const value = attribute_values[i].value;

        let a = new Attribute(key, value);
        sheet.attributes.push(a);
    }

    // others
    sheet.others = [];
    let other_keys = document.querySelectorAll(".input-other-key");
    let other_values = document.querySelectorAll(".input-other-value");
    for (let i = 0; i < other_keys.length; ++i) {
        const key = other_keys[i].value;
        const value = other_values[i].value;

        let o = new Other(key, value);
        sheet.others.push(o);
    }

    return sheet;
}

function writeDisplay(sheet) {
    const template = document.getElementById("template-export");
    const elem = template.content.cloneNode(true);

    // name
    const nameElem = elem.querySelector(".export-name");
    nameElem.innerHTML = sheet.name;

    // description
    const descriptionElem = elem.querySelector(".export-description");
    descriptionElem.innerHTML = sheet.description;

    // image
    const imageElem = elem.querySelector(".export-image");
    if (sheet.image) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(sheet.image);
        fileReader.addEventListener("load", function () {
            imageElem.src = this.result;
        });
    }

    // attributes
    const attributesContainer = elem.querySelector(".export-attributes");
    sheet.attributes.forEach(attribute => {
        const aTemplate = document.getElementById("t-export-attribute");
        const clone = aTemplate.content.cloneNode(true);

        const keyElem = clone.querySelector(".attribute-key");
        keyElem.innerHTML = attribute.key;

        const valueElem = clone.querySelector(".attribute-value");
        valueElem.innerHTML = attribute.value;

        attributesContainer.appendChild(clone);
    });

    // others
    const othersContainer = elem.querySelector(".export-others");
    sheet.others.forEach(other => {
        const oTemplate = document.getElementById("template-export-other");
        const clone = oTemplate.content.cloneNode(true);

        const keyElem = clone.querySelector(".other-key");
        keyElem.innerHTML = other.key;

        const valueElem = clone.querySelector(".other-value");
        valueElem.innerHTML = other.value;

        othersContainer.appendChild(clone);
    });

    return elem;
}

function generateSheet() {
    // parse input
    const input = readInput();

    // display result
    const elem = writeDisplay(input);

    // we need to render the canvas before we can hide it
    const exp = document.getElementById("export");
    exp.innerHTML = null;
    exp.appendChild(elem);
}

function saveSheet() {
    const elem = document.getElementById("export");

    html2canvas(elem).then(function (canvas) {
        // source https://stackoverflow.com/a/58652379/11186407
        let downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', 'CanvasAsImage.png');

        canvas.toBlob(function (blob) {
            let url = URL.createObjectURL(blob);
            downloadLink.setAttribute('href', url);
            downloadLink.click();
        });
    });
}


export {generateSheet, saveSheet};

