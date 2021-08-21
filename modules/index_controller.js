export function addButton() {
    const container = document.getElementById("in_attributes");
    const template = document.getElementById("template-in-attribute");

    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
}

export function deleteAttribute(node) {
    let elem = node.closest(".in-attribute-container");
    if (elem) {
        elem.remove();
    }
}
