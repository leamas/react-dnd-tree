import React, {Component}  from 'react';

import add_icon from './icons/add.png';

import styles from './add_tool.css';


// Action inserts a new node.
export default class AddTool extends Component {

    render() {
        return (
            <span className="rdt_add">
                <a href="#Add new node" onClick={this.props.onNewNode}>
                    <img
                        src={add_icon}
                        className={styles.img}
                        role="presentation" />
                </a>
            </span>
        );
    }
}

AddTool.propTypes = {
    onNewNode: React.PropTypes.func.isRequired,
};

