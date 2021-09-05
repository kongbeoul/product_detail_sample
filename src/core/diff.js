export const updateAttributes = (newNode, oldNode) => {
    const newNodeProps = [...newNode.attributes];
    const oldNodeProps = [...oldNode.attributes];

    for(const { name, value } of newNodeProps) {
        if(oldNode.getAttribute(name) === value) continue;
        oldNode.setAttirbute(name, value);
    }

    for(const { name } of oldNodeProps) {
        if(newNode.getAttribute(name) !== undefined) continue;
        oldNode.removeAttribute(name);
    }
};

export const updateElements = (parent, newNode, oldNode) => {
    if(newNode && !oldNode) return parent.appendChild(newNode);
    if(!newNode && oldNode) return oldNode.remove();
    if(newNode instanceof Text && oldNode instanceof Text) {
        if(newNode.nodeValue === oldNode.nodeValue) return;
        oldNode.nodeValue = newNode.nodeValue;
        return;
    }
    if(newNode.nodeName !== oldNode.nodeName) return parent.replaceChild(newNode, oldNode);
    
    updateAttributes(newNode, oldNode);

    const newNodeChilds = [...newNode.childNodes];
    const oldNodeChilds = [...oldNode.childNodes];
    const len = Math.max(newNodeChilds.length, oldNodeChilds.length);

    for(let i = 0; i < len; i++) {
        updateElements(oldNode, newNodeChilds[i], oldNodeChilds[i]);
    }
}