import React, {Component}  from 'react';
import {DropTarget} from 'react-dnd';

import pencil_icon from './icons/pencil.png';
import no_pencil_icon from './icons/no-pen.png';

import {ItemTypes} from './commons.js';

import styles from './edit_icon.css';


// Dummy edit icon target
var editTarget = {
    drop: function(/* props, monitor */) {},
    canDrop: function( /* props, monitor */) { return false; }
};


// Collected properties for the edit icon
function editCollect(connect, monitor) {
    return {
        highlighted: monitor.canDrop(),
        hovered: monitor.isOver(),
        connectDropTarget: connect.dropTarget()
    };
}


// The edit icon (a pen), with some drop-target semantics.
class _EditIcon extends Component {

    render() {
        const imageClass =
            this.props.node.editing ? styles.editing : styles.closed;
        const edit_icon =
            this.props.node.editing ? no_pencil_icon : pencil_icon;
        const connectDropTarget = this.props.connectDropTarget;
        const editCallback = function(node) {
            this.props.setEditMode(node.id, !node.editing);
        }.bind(this, this.props.node);
        return connectDropTarget(
            <a href="#Editing" onClick={editCallback}>
                <img src={edit_icon} className={imageClass}/>
            </a>
        );
    }
}

_EditIcon.propTypes = {
    node: React.PropTypes.object.isRequired,
    setEditMode: React.PropTypes.func.isRequired,
    highlighted: React.PropTypes.bool.isRequired,
    hovered: React.PropTypes.bool.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired
};

const EditIcon =
    DropTarget(ItemTypes.NODE, editTarget, editCollect)(_EditIcon);

export default EditIcon;
