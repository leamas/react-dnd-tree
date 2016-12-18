import React, {Component} from 'react';
import TreeView, {testdata} from './tree.js';

// Demonstrate a customized edit form with a user-defined property.
export default class Demo3 extends Component {

    // Here, we need to fetch data from server.
    constructor(props) {
        super(props);
        this.state = {contents: testdata};
    }

    // The contents has been changed somehow.
    onChange(contents) {
        console.log("New contents: %o", contents);
    }

    // Function providing a form to edit a node's properties.
    // - node: object - The actual node. See Data Model in README.md.
    // - onEdit: function(node) - callback to invoke when a node's
    //   properties are changed.
    editForm(node, onEdit) {
        const outerStyle = {display: 'inline-block'};
        const nameCallback = function(node, event) {
            node.name = event.target.value;
            onEdit(node);
        }.bind(null, node);
        const myValue = node.myValue ? node.myValue : false;
        const myCallback = function(node, event) {
            node.myValue = event.target.checked;
            onEdit(node);
        }.bind(null, node);
        return (
            <span style={outerStyle}>
                <form>
                    <input
                        type="text"
                        value={node.name}
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
                    options={{enableEdit: true, editForm: this.editForm}} />
            </div>
        );
    }
}
