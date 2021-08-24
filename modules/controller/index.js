function appendAttributeInput(attribute = null) {
    let container = document.getElementById("in_attributes");
    let template = document.getElementById("template-in-attribute");
    let clone = template.content.cloneNode(true);

    if (attribute) {
        let key_input = clone.querySelector(".in-attribute-key")
        key_input.value = attribute;
        key_input.disabled = true;
    }

    container.appendChild(clone);
}

function removeAttributeInput(node) {
    let elem = node.closest(".in-attribute-container");
    if (elem) {
        elem.remove();
    }
}



export {appendAttributeInput, removeAttributeInput};
