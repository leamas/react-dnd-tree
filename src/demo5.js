import React, {Component} from 'react';
import TreeView, {testdata} from './tree.js';

// Demonstrate a customized body, adding a callback called when clicked.
export default class Demo5 extends Component {

    // Here, we need to fetch data from server.
    constructor(props) {
        super(props);
        this.state = {contents: testdata};
    }

    // The contents has been changed somehow.
    onChange(contents) {
        console.log("New contents: %o", contents);
    }

    // User clicked on a node.
    onActivate(node) {
        console.log("Activated node %o", node);
    }


    // Function providing the node body, overriding the default plain name.
    // - node: object - The actual node. See Data Model in README.md.
    // - props: As provided to the Node object.
    customBody(node, props) {
        const style = {
            borderStyle: props.hovered ? 'dotted' : 'none'
        };
        const callback = function(node) {
            this.onActivate(node);
            return false;
        }.bind(this, node);
        return (
            <span style={style}>
                <a href="#notUsed" onClick={callback}>
                    {node.name}
                </a>
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
                    options={{
                        enableEdit: true,
                        customBody: this.customBody.bind(this)
                    }} />
            </div>
        );
    }
}
