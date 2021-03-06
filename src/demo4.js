import React, {Component } from 'react'
import TreeView, {testdata} from  './tree.js'

// Demonstrate handling of a server not acceptinng bult updates.
export default class Demo2 extends Component {

    // Here, we need to fetch data from server.
    constructor(props) {
        super(props);
        this.state = {contents: testdata};
    }

    // A node is moved.
    //   - newParent: Parent for the moved node, with re-arranged
    //     children list.
    //   - oldParent: The moved node's previous parent.
    onMoveNode(newParent, oldParent) {
        console.log("Shuffled children in %o:" , newParent);
        console.log("Possibly one child moved from %o:" , oldParent);
    }

    // User edited node data.
    //   - id  changed node id.
    //   - data: object. By default, only the name property is defined,
    //     but a custom NodeEditForm might add more properties.
    onEdit(id, data) {
        console.log("Edited id: " + id + ", new data: %o", data);
    }

    // User dropped an item in the trash.
    onDeleteNode(id) {
        console.log("Removed id: " + id);
    }

    // User added a new node.
    //   - id (int) Unique id for new node.
    //   - text(string) new name.
    //   - nodes: Updated contents, all nodes.
    onAddNode(nodes, text, id) {
        console.log("Adding node, id: " + id + ", text: " + text
            + ", new length: " + nodes.length);
    }

    render() {
        return (
            <div className="TreeviewDemo">
                <TreeView
                    contents={this.state.contents}
                    onEdit={this.onEdit}
                    onDeleteNode={this.onDeleteNode}
                    onMoveNode={this.onMoveNode}
                    onAddNode={this.onAddNode} />
            </div>
        );
    }
}
