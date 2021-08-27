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

function removeParent(base_node, parent_node_class) {
    let elem = base_node.closest("." + parent_node_class);
    if (elem) {
        elem.remove();
    }
}

function appendOtherInput() {
    let container = document.getElementById("container-other-inputs");

    let template = document.getElementById("template-input-other");
    let clone = template.content.cloneNode(true);

    container.appendChild(clone);
}


export {appendAttributeInput, removeParent, appendOtherInput};
