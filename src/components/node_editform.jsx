/* global module */

import React, {Component}  from 'react';
import ReactDOM  from 'react-dom';

import styles from './node_editform.css';

class NodeEditForm extends Component {

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.nameInput).focus();
    }

    render() {
        const node = this.props.node;
        const callback = function(node, event) {
            node.name = event.target.value;
            this.props.onEdit(node);
        }.bind(this, node);
        return (
            <span className={styles.outerSpan}>
                <form>
                    <input
                        type="text"
                        value={node.name}
                        ref="nameInput"
                        onChange={callback} />
                </form>
            </span>
        );
    }
}

NodeEditForm.propTypes = {
    node: React.PropTypes.object.isRequired,
    onEdit: React.PropTypes.func.isRequired,
};

module.exports = NodeEditForm;
