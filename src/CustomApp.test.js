import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Demo3 from './demo3.js';


class CustomApp extends Component {

    render() {
        return (
            <div>
                <h1> Third demo: </h1>
                <Demo3 />
            </div>
        );
    }
}

it('renders without crashing when customized', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomApp />, div);
});
