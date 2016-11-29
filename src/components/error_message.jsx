import React, {Component}  from 'react';

import styles from './error_message.css';


// The communications error message
export default class ErrorMessage extends Component {

    render() {
        const msgStyle = {
            visibility: this.props.message ? 'visible' : 'hidden',
        };

        return (
            <div style={msgStyle} className={styles.message}>
                <a href="#confirm" onClick={this.props.onConfirm}>
                    <font size="3"> &#10761; </font>
                </a>
                <span> {this.props.message} </span>
            </div>
        );
    }
}

ErrorMessage.propTypes = {
    message: React.PropTypes.string,
    onConfirm: React.PropTypes.func
};
