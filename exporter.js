class Attribute {
    constructor(key, value) {
        self.key = key;
        self.value = value;
    }
}

class Sheet {
    constructor(name, description, image, attributes) {
        self.name = name;
        self.description = description;
        self.image = image;
        self.attributes = attributes;
    }
}


function _parse() {
    const sheet = new Sheet();

    sheet.name = document.getElementById("in_name").value;
    sheet.description = document.getElementById("in_description").value;
    sheet.image = document.getElementById("in_image").files[0];

    // attributes
    sheet.attributes = [];
    const attributeList = document.getElementById('in_attributes').children;
    for (let i = 0; i < attributeList.length; ++i) {
        const input = attributeList[i].children;

        const attribute = new Attribute();
        attribute.key = input[0].value;
        attribute.value = input[1].value;

        sheet.attributes.push(attribute);
    }

    return sheet;
}

function _display(sheet) {
    const template = document.getElementById("t-export");
    const container = template.content.cloneNode(true);

    // name
    const nameElem = container.querySelector(".export-name");
    nameElem.innerHTML = sheet.name;

    // description
    const descriptionElem = container.querySelector(".export-description");
    descriptionElem.innerHTML = sheet.description;

    // image
    const imageElem = container.querySelector(".export-image");
    imageElem.src = sheet.description;

    // attributes
    const attributesElem = container.querySelector(".export-image");
    for (let i = 0; i < sheet.attributes.length; ++i) {
        const attribute = sheet.attributes[i];

        const attributeElem = container.querySelector(".export-attributes");

        const attributeTemplate = document.getElementById("t-export-attribute");
        const clone = attributeTemplate.cloneNode(true);

        const keyElem = clone.querySelector(".attribute-key");
        keyElem.innerHTML = attribute.key;

        const valueElem = clone.querySelector(".attribute-value");
        valueElem.innerHTML = attribute.value;

        attributeElem.appendChild(clone);
    }

    container.appendChild(attributesElem);

    return container;
}


function _export() {
    // parse input
    const input = _parse();

    // display result
    const elem = _display(input);

    const exp = document.getElementById("export");
    exp.appendChild(elem);
    save_fo_file(exp);
    exp.innerHTML = null;
}

function save_fo_file(elem) {
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
