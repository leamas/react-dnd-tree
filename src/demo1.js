import React, { Component } from 'react';
import {UIBasicTree, testdata} from './tree.js';

export default class Demo1 extends Component {

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
        console.log("Edited id: " + id + ", new data: %o", data);
    }

    render() {
        const onChange = function(c) {this.setState({contents: c}); }.bind(this);
        return (
            <div className="BasicTreeDemo">
                <UIBasicTree
                    contents={this.state.contents}
                    onChange={onChange} />
            </div>
        );
    }
}
