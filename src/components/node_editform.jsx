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
        const callback = function(id, event) {
            this.props.onEdit(node.id, {name: event.target.value});
        }.bind(this, node.id);
        return (
            <span className={styles.outerSpan}>
                <form>
                    <input
                        type="text"
                        value={node.data.name}
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
