import React, {Component}  from 'react';
import {DropTarget} from 'react-dnd';

import trash from './icons/trash.png';
import trash_open from './icons/trash-open.png';

import {ItemTypes} from './commons.js';

import styles from './trashcan.css';


// Handle items (nodes) dropped into the trashcan
var trashTarget = {

    drop: function(props, monitor) {
        const item = monitor.getItem();
        props.onDelete(item.id);
    },

    canDrop: function(props, monitor) {
        const item = monitor.getItem();
        return !item.hasChildren;
    }
};


// Collected properties for the trashcan
function trashCollect(connect, monitor) {
    return {
        highlighted: monitor.canDrop(),
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver()
    };
}


// Drop target removing dropped node.
class _Trashcan extends Component {

    render() {
        var connectDropTarget = this.props.connectDropTarget;
        const icon = this.props.hovered ? trash_open : trash;
        return connectDropTarget(
            <span className="rdt_trash">
               <img src={icon} className={styles.img} />
            </span>
        );
    }
}

_Trashcan.propTypes = {
    onDelete: React.PropTypes.func.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired,
    highlighted: React.PropTypes.bool.isRequired,
    hovered: React.PropTypes.bool.isRequired,
};

const Trashcan =
    DropTarget(ItemTypes.NODE, trashTarget, trashCollect)(_Trashcan);
export default Trashcan;
