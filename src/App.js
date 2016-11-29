import React, { Component } from 'react';
import './App.css';
import './components/add_tool.jsx';
import testdata from './testdata.js';
import BasicTree from './components/basic_tree.jsx';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {contents: testdata};
    }

    render() {
        const onChange =
            function(c) {this.setState({contents: c}); }.bind(this);
        return (
            <div className="App">
                <h1> First demo: </h1>
                <BasicTree
                    contents={this.state.contents}
                    onChange={onChange} />
            </div>
        );
    }
}

export default App;
