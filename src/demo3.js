import React, {Component} from 'react';
import TreeView, {testdata} from './tree.js';

export default class Demo2 extends Component {

    // Here, we need to fetch data from server.
    constructor(props) {
        super(props);
        this.state = {contents: testdata};
    }

    // The contents has been changed somehow.
    onChange(contents) {
        console.log("New contents: %o", contents);
    }

    // A node is moved.
    //   - newParent:  Parent for the moved node, with re-arranged
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
        var nodes = this.state.contents.map(function (id, data, node) {
            if (node.id == id)                   // eslint-disable-line
                node.data = data;
            return node;
        }.bind(null, id, data));
        console.log("Edited id: " + id + ", new data: %o", data);
        this.setState({contents: nodes})
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

    editForm(props) {
        const node = props.node;
        const outerStyle = {display: 'inline-block' };
        const nameCallback = function(id, event) {
            node.data.name = event.target.value;
            props.onEdit(node.id, node.data);
        }.bind(this, node.id);
        const myValue = node.data.myValue ? node.data.myValue : false;
        const myCallback = function(id, event) {
            node.data.myValue = event.target.checked;
            props.onEdit(node.id, node.data);
        }.bind(this, node.id);
        return (
            <span style={outerStyle}>
                <form>
                    <input
                        type="text"
                        value={node.data.name}
                        onChange={nameCallback} />
                    <br />
                    {'My own property'}
                    <input
                        type="checkbox"
                        name="myValue"
                        value={myValue}
                        checked={myValue}
                        onChange={myCallback} />
                </form>
            </span>
        );
    }

    render() {
        const onChange = function(c) {this.setState({contents: c}); }.bind(this);
        return (
            <div className="TreeviewDemo">
                <TreeView
                    contents={this.state.contents}
                    onChange={onChange}
                    onChange={onChange}
                    options={{enableEdit: true, editForm: this.editForm}} />
            </div>
        );
    }
}
