//
// The complete tree UI
//
// The view is focused on creating a basic dnd interface for the generic
// tree operations: add, delete, move and rename. As such, it adds an add
// tool and a trashcan to the basic treeview.
//
// As soon as the tree is changed the onChange callback is invoked. Besides
// this, there is also separate callbacks for add, delete, move and rename.
// The data is supplied in props.contents.
//
// An obvious extension would nbe to add a onClicked callback with
// corresponding UI. However, there is no use for that right now.

/* global require */
/* eslint no-console: off */
(console) ? console.log('Logging is supported.') : console.log=function(){};

import React, {Component}  from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import * as Forest from './forest.js';

import styles from './treeview.css';

import Trashcan from './trashcan.jsx';
import AddTool from './add_tool.jsx';
import BasicTree from './basic_tree.jsx';  // eslint-disable-line

// The  overall tree (a k a forest) with Nodes, Sinks and state.
class _TreeView extends Component {

    constructor(props) {
        super(props);
        this.newNode = this.newNode.bind(this);
        this.deleteNode = this.deleteNode.bind(this);
    }

    // Create a new node
    newNode(text = 'Ny kategori') {
        let nodes = this.props.contents;
        const id = Forest.findLargestId(nodes, 0);
        let node = {id: Number(id) + 1, data: {name: text}, children: []};
        nodes.splice(0, 0, node);
        if (this.props.onChange)
            this.props.onChange(nodes);
        if (this.props.onAddNode)
            this.props.onAddNode(nodes, text, id + 1);
    }

    // Given an id delete corresponding node.
    deleteNode(id) {
        let forest = this.props.contents;
        forest = Forest.deleteNode(forest, id);
        if (this.props.onChange)
            this.props.onChange(forest);
        if (this.props.onDeleteNode)
            this.props.onDeleteNode(id);
    }

    render() {
        console.log("Treeview: " + styles.imgCell);
        if (this.props.contents === null || this.props.contents === []) {
            return <div> {'Loading...'} </div>;
        }
        const newNodeCallback = this.newNode.bind(null, 'Ny kategori');
        return (
            <table className="rdt_view">
                <tbody>
                    <tr>
                        <td>
                            <BasicTree
                                contents={this.props.contents}
                                onChange={this.props.onChange}
                                onEdit={this.props.onEdit}
                                onMoveNode={this.props.onMoveNode}
                                options={this.props.options} />
                        </td>
                        <td className={styles.imgCell}>
                            <AddTool onNewNode={newNodeCallback} />
                        </td>
                        <td className={styles.imgCell}>
                            <Trashcan onDelete={this.deleteNode} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

_TreeView.propTypes = {
    contents: React.PropTypes.array,
    onChange: React.PropTypes.func,
    onEdit: React.PropTypes.func,
    onDeleteNode: React.PropTypes.func,
    onMoveNode: React.PropTypes.func,
    onAddNode: React.PropTypes.func,
    options: React.PropTypes.object
};

const TreeView = DragDropContext(HTML5Backend)(_TreeView);
export default TreeView;
