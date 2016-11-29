/* global module */

import React, {Component}  from 'react';

import styles from './my_node_editform.css';

class NodeEditForm extends Component {

    render() {
        const node = this.props.node;
        const nameCallback = function(id, event) {
            node.data.name = event.target.value;
            this.props.onEdit(node.id, node.data);
        }.bind(this, node.id);

        const myValue = node.data.myValue ? node.data.myValue : false;
        const myCallback = function(id, event) {
            node.data.myValue = event.target.checked;
            this.props.onEdit(node.id, node.data);
        }.bind(this, node.id);

        return (
            <span className={styles.outerSpan}>
                <form>
                    <input
                        type="text"
                        value={node.data.name}
                        onChange={nameCallback} />
                    <br />
                    {'My own property'}
                    <input
                        type="checkbox"
                        name="myValue"
                        value={myValue}
                        checked={myValue}
                        onChange={myCallback} />
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
