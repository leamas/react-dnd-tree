//
// Tree operations.
//
// This is not really a tree but a forest: the root element is a list of
// nodes. Each node has some required properties:
//
//    - id: int, must be unique and > 0.
//    - name: string, user visible label.
//    . children: child list, possibly [].
//    - collapsed: boolean, if child list is displayed or not.
//    - editing: boolean, if child is currently editing the name.
//
// The tree operations does not interfere with whatever other node
// properties defined.

/* eslint no-console: off */
(console) ? console.log('Logging is supported.') : console.log=function(){};


// Set initial values for all nodes.
export function initNodes(nodes) {
    if (!nodes)
        return;
    for (var i = 0; i < nodes.length; i += 1) {
        nodes[i].collapsed = false;
        nodes[i].editing = false;
        initNodes(nodes[i].children);
    }
}


// Similar to standard map(), returns a deep structure where
// each node is the result of applying the map(node) function.
export function map(nodes, func) {
    var newNodes = [];
    for (var i = 0; i < nodes.length; i += 1) {
        newNodes.push(func(nodes[i]));
        map(newNodes[i].children, func);
    }
    return newNodes;
}


// Given an id return corresponding node or null if not found.
export function findNodeById(nodes, id) {
    for (var i = 0; i < nodes.length; i += 1) {
        if (nodes[i].id == id)
            return nodes[i];
        const found = this.findNodeById(nodes[i].children, id);
        if (found)
            return found;
    }
    return null;
}


// Find largest id in forest.
export function findLargestId(nodes, largestSoFar) {
    for (var i = 0; i < nodes.length; i += 1) {
        const value = Number(nodes[i].id);
        largestSoFar = value > largestSoFar ? value : largestSoFar;
        largestSoFar =
            this.findLargestId(nodes[i].children, largestSoFar);
    }
    return largestSoFar;
}


// Given an id return it's parent node or null if not found. The parent
// argument is what's returned for root level elements, by default a
// {id: -1, name: 'root', children: nodes} node object.
export function findParentNodeById(nodes, id, parentNode = null) {

    const parent =
        parentNode ? parentNode : {id: -1, name: 'root', children: nodes};
    for (var i = 0; i < nodes.length; i += 1) {
        if (nodes[i].id == id)
            return parent;
        const found = this.findParentNodeById(nodes[i].children, id, nodes[i]);
        if (found)
            return found;
    }
    return null;
}


// Given an id and a new parent, move from old parent to the new.
// node is placed at head of new parent's children list.
//
// Returns dict of 'forest' - updated nodes and 'node' - new
// parent for id. node is null if operation fails, node.id == 0
// for top-level new parent.
export function dropIntoNode(nodes, newParentId, id) {
    if (newParentId == id)
        return {forest:nodes, node: null};
    const root = {id: 0, name: 'root', children: nodes};
    let oldParent = this.findParentNodeById(root.children, id, root);
    if (!oldParent)
        return {forest:nodes, node: null};
    let newParent = this.findNodeById(root.children, newParentId);
    if (!newParent)
        return {forest:nodes, node: null};
    const node = this.findNodeById(root.children, id);
    if (!node)
        return {forest:nodes, node: null};
    oldParent.children = oldParent.children.filter(function (item) {
        return item.id != id;
    });
    newParent.children.splice(0, 0, node);
    return {forest:root.children, node: newParent};
}


// Given an id and a peer, move id from old parent to the new.
// Dropping after a peer with non-collapsed children places
// node at head of peer's children list. Otherwise, the node is
// placed after peer in peer's parent's children list.
//
// Returns dict of 'forest' (updated trees) and 'node' - new
// parent for id. node is null if operations fails,
// node.id == 0 for top-level elements.
export function dropAfterNode(nodes, peerId, id) {
    let oldParent = this.findParentNodeById(nodes, id);
    if (!oldParent)
        return {forest:nodes, node: null};
    let newParent = this.findParentNodeById(nodes, peerId);
    if (!newParent)
        return {forest:nodes, node: null};
    const node = this.findNodeById(nodes, id);
    if (!node)
        return {forest: nodes, node: null};
    const peer = this.findNodeById(nodes, peerId);
    if (!peer)
        return {forest: nodes, node: null};
    oldParent.children = oldParent.children.filter(function (item) {
        return item.id != id;
    });
    if (peer.children.length > 0 && !peer.collapsed) {
        // Dropped at first position in children list, the same as
        // dropping into peer.
        peer.children.splice(0, 0, node);
        return {forest: nodes, node: peer};
    }
    let ix = newParent.children.findIndex(function (peerId, item) {
        return item.id == peerId;
    }.bind(null, peerId));
    if (ix == -1) {
        newParent.children.push(node);
    } else {
        newParent.children.splice(ix + 1, 0, node);
    }
    return {forest: nodes, node: newParent};
}


// Given an id, delete node. Returns the updated forest.
export function deleteNode(nodes, id) {
    let parent = this.findParentNodeById(nodes, id);
    if (parent.id != -1)
        nodes = parent.children;
    nodes = nodes.filter(function (item) {
        return item.id != id;
    });
    return nodes;
}


// Create a new node. Node is created with given text as name,
// an auto-generated id and placed in the root list. Returns
// the updated forest.
export function addNode(nodes, text = 'Ny kategori') {
    const id = findLargestId(nodes, 0);
    let node = {id: id + 1, name: text, children: []};
    nodes.splice(0, 0, node);
    return nodes;
}


// Given id, attribute name and a value update a node's attribute.
// Returns  the updated forest.
export function setAttribute(nodes, id, attribute, value) {
    let node = this.findNodeById(nodes, id);
    if (!node) {
        console.log('Cannot locate id: ' + (id ? id : 'null'));
        return;
    }
    node[attribute] = value;
    return nodes;
}
