import React, {Component} from 'react';
import TreeView, {testdata} from './tree.js';

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
    // - onEdit: function(id, data) - callback to invoke when node.data
    //   changes using node.id as id parameter.
    editForm(node, onEdit) {
        const outerStyle = {display: 'inline-block' };
        const nameCallback = function(id, event) {
            node.data.name = event.target.value;
            onEdit(node.id, node.data);
        }.bind(this, node.id);
        const myValue = node.data.myValue ? node.data.myValue : false;
        const myCallback = function(id, event) {
            node.data.myValue = event.target.checked;
            onEdit(node.id, node.data);
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
                    options={{enableEdit: true, editForm: this.editForm}} />
            </div>
        );
    }
}
