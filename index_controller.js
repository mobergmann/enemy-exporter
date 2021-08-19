function addButton() {
    const container = document.getElementById("in_attributes");
    const template = document.getElementById("template-in-attribute");

    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
}

function _clear() {
    const tmp = document.getElementById("export");
    tmp.innerHTML = null;
}
