/* eslint no-console: off */
(console) ? console.log('Logging is supported.') : console.log=function(){};

import React, {Component} from 'react';
import './App.css';

import Demo2 from './demo2.js';

class App extends Component {

   render() {
        return (
            <div>
                <h1> Second demo: </h1>
                <Demo2 />
            </div>
        );
    }
}

export default App;
