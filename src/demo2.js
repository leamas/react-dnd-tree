import React, {Component } from 'react'
import TreeView, {testdata} from  './tree.js'


// Demonstrate the treeview, basic tree +  add/remove parts.
export default class Demo2 extends Component {

    // Here, we need to fetch data from server.
    constructor(props) {
        super(props);
        this.state = {contents: testdata};
    }

    // The contents has been changed somehow, update server.
    onChange(contents) {
        console.log("New contents: %o", contents);
    }

    render() {
        const onChange = function(c) {this.setState({contents: c}); }.bind(this);
        return (
            <div className="TreeviewDemo">
                <TreeView
                    contents={this.state.contents}
                    onChange={onChange} />
            </div>
        );
    }
}
