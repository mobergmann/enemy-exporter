function addButton() {
    const container = document.getElementById("import-keys");
    const template = document.getElementById("template-key_value");

    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
}