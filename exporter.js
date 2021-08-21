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


function _parse_input() {
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
    const container = document.getElementById("export");

    // clear export
    container.innerHTML = null;

    // set references
    {
        // name
        const nameNode = document.createElement("h1");
        nameNode.innerHTML = sheet.name;
        nameNode.disabled = true;
        container.appendChild(nameNode);

        // description
        const descriptionNode = document.createElement("div");
        descriptionNode.innerHTML = sheet.description;
        descriptionNode.disabled = true;
        container.appendChild(descriptionNode);

        // image
        const imageNode = document.createElement("img");
        imageNode.src = sheet.image;
        imageNode.disabled = true;
        container.appendChild(imageNode);

        // attributes
        const attributeNode = document.createElement('div');
        for (let i = 0; i < sheet.attributes.length; ++i) {
            const attribute = sheet.attributes[i];

            const container = document.createElement("div");

            const keyNode = document.createElement("div");
            keyNode.innerHTML = attribute.key;
            container.appendChild(keyNode);

            const valueNode = document.createElement("div");
            valueNode.innerHTML = attribute.value;
            container.appendChild(valueNode);

            attributeNode.appendChild(container);
        }
        container.appendChild(attributeNode);
    }
}


function _export() {
    // parse input
    const input = _parse_input();

    // display result
    _display(input);
}

function save_fo_file() {
    const elem = document.getElementById("export");

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
