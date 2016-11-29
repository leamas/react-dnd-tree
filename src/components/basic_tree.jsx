//
// The categories treeview.
//
// The view is focused on creating a basic dnd interface for the generic
// tree operations:  move and rename.
//
// As soon as the tree is changed the onChange callback is invoked. Besides
// this, there is also separate callbacks for  move and rename.
// The data is supplied in props.contents.
//
// An obvious extension would be to add a onClicked callback with
// corresponding UI. However, there is no use for that right now.

/* eslint no-console: off */
(console) ? console.log('Logging is supported.') : console.log=function(){};

import React, {Component}  from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Node from './node.jsx';
import Sink from './sink.jsx';
import EditIcon from './edit_icon.jsx';
import * as Forest from './forest.js';


// The indent before a Node.
class Indent  extends Component {

    render() {
        let width = '' + (this.props.width) + 'em';
        const boxStyle = {
            width: width,
            maxWidth: width,
            height:'1em' ,
            display: 'inline-block'
        };
        return <span style={boxStyle} ></span>;
    }
}

Indent.propTypes = {
    width: React.PropTypes.number.isRequired,
};


// The  overall tree (a k a forest) with Nodes, Sinks and state.
class _BasicTree extends Component {

    constructor(props) {
        super(props);
        this.dropIntoNode = this.dropIntoNode.bind(this);
        this.dropAfterNode = this.dropAfterNode.bind(this);
        this.setCollapsed = this.setCollapsed.bind(this);
        this.setName = this.setName.bind(this);
        this.setEditMode = this.setEditMode.bind(this);
    }

    // Given an id and a new parent, move from old parent to the new.
    dropIntoNode(newParentId, id) {
        let forest = this.props.contents;
        let root = {id: 0, name: 'root', children: forest};
        const oldParent = Forest.findParentNodeById(forest, id, root);
        let result = Forest.dropIntoNode(forest, newParentId, id);
        if (this.props.onChange)
            this.props.onChange(result.forest);
        if (result.node && this.props.onMoveNode)
            this.props.onMoveNode(result.node, oldParent);
    }

    // Given an id and a peer, move id from old parent and place
    // it "after" the peer. If the peer has a non-collapsed child
    // list, node is placed as first child.
    dropAfterNode(peerId, id) {
        let forest = this.props.contents;
        const oldParent = Forest.findParentNodeById(forest, id);
        let result = Forest.dropAfterNode(forest, peerId, id);
        if (result.node && this.props.onMoveNode)
            this.props.onMoveNode(result.node, oldParent);
        if (this.props.onChange)
            this.props.onChange(result.forest);
    }

    // Given id and a boolean value update node's collapsed property.
    setCollapsed(id, collapsed) {
        let nodes = this.props.contents;
        Forest.setAttribute(nodes, id, 'collapsed', collapsed);
        if (this.props.onChange)
            this.props.onChange(nodes);
    }

    // Given id and a string update node's name.
    setName(id, name) {
        let nodes = this.props.contents;
        Forest.setAttribute(nodes, id, 'name', name);
        if (this.props.onChange)
            this.props.onChange(nodes);
        if (this.props.onRenameNode)
            this.props.onRenameNode(id, name);
    }

    // Given id and a boolean value update node's editing property.
    setEditMode(id, value) {
        let nodes = this.props.contents;
        Forest.setAttribute(this.props.contents, id, 'editing', value);
        if (this.props.onChange)
            this.props.onChange(nodes);
    }

    // Render a single child node + it's children.
    renderChild(nodes, ix, indent) {
        const node = nodes[ix];
        if (!node)
            return <div> </div>;
        let width = (indent + node.name.length) * 3 / 4;
        width = '' + width + 'em';
        const nodeStyle = {display: 'block'};
        const key = '' + ix + '-' + node.id;
        const sinkIndent = node.children.length > 0 ? indent + 1 : indent;
        return (
            <div key={key} style={nodeStyle}>
                <Indent width={indent}  />
                <Node
                    node={node}
                    onSetCollapsed={this.setCollapsed}
                    onNameChange={this.setName}
                    onDroppedInto={this.dropIntoNode} />
                <EditIcon setEditMode={this.setEditMode} node={node} />
                <Sink
                    width={width}
                    indent={sinkIndent}
                    peerId={parseInt(node.id)}
                    onDroppedInto={this.dropAfterNode}/>
                {
                    this.renderChildren(
                        node.collapsed, node.children, indent + 1)
                }
            </div>
        );
    }

    renderChildren(collapsed, nodes, indent) {
        if (!nodes || nodes.length === 0 || collapsed)
            return <span></span>;
        let result = [];
        for (var i = 0; i < nodes.length; i += 1) {
            result.push(this.renderChild(nodes, i, indent));
        }
        return ( <span> {result} </span> );
    }

    render() {
        if (this.props.contents === null || this.props.contents === []) {
            return <div> {'Loading...'} </div>;
        }
        return (
            <div className="rdt_tree">
                { this.renderChildren( false, this.props.contents, 0) }
            </div>
        );
    }
}


_BasicTree.propTypes = {
    contents: React.PropTypes.array,
    onChange: React.PropTypes.func,
    onRenameNode: React.PropTypes.func,
    onMoveNode: React.PropTypes.func,
};

const BasicTree = DragDropContext(HTML5Backend)(_BasicTree);

export default BasicTree;
export {_BasicTree};
