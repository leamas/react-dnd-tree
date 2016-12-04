import React, {Component } from 'react';
import {UIBasicTree, testdata} from './tree.js';

export default class Demo1 extends Component {

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
            <div className="BasicTreeDemo">
                <UIBasicTree
                    contents={this.state.contents}
                    onChange={onChange} />
            </div>
        );
    }
}
