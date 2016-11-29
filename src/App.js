/* eslint no-console: off */
(console) ? console.log('Logging is supported.') : console.log=function(){};

import React, { Component } from 'react';
import './App.css';
import './components/add_tool.jsx';
import Demo1 from './demo1.js';

class App extends Component {

    render() {
        return (
            <div>
                <h1> First demo: </h1>
                <Demo1 />
            </div>
        );
    }
}

export default App;
