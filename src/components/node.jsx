import React, {Component}  from 'react';

import {DragSource} from 'react-dnd';
import {DropTarget} from 'react-dnd';
import flow from 'lodash/flow';

import EditIcon from './edit_icon.jsx';
import NodeEditForm  from './node_editform.jsx';

import triangleRight from './icons/triangle-right.png';
import triangleDown from './icons/triangle-down.png';

import {ItemTypes} from './commons.js';
import styles from './node.css';

import config from 'config.json';


// Handle items dropped into a Node.
var nodeTarget = {
    drop: function(props, monitor) {
        const item = monitor.getItem();
        props.onDroppedInto(props.node.id, item.id);
    }
};


// Collected properties for the drop target
function nodeDropCollect(connect, monitor) {
    return {
        highlighted: monitor.canDrop(),
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver()
    };
}


// Collected properties for the draggable Node.
function nodeDragCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}


// The dragged Node properties.
const nodeSource = {

    // The drag item is the node id.
    beginDrag: function (props) {
        let item = {
            id: props.node.id,
            hasChildren: props.node.children.length > 0
        };
        return item;
    },

    endDrag: function (props, monitor /*, component */) {
        if (!monitor.didDrop()) {
            return;
        }
    }
};


// A draggable treenode, also accepting dropped childs.
class _Node extends Component {

    render() {
        var connectDragSource = this.props.connectDragSource;
        var connectDropTarget = this.props.connectDropTarget;
        const node = this.props.node;
        const arrowStyle = {
            visibility: node.children.length > 0 ? 'visible' : 'hidden'
        };
        const textStyle = {
            borderStyle: this.props.hovered ? 'dotted' : 'none'
        };
        const triangle = node.collapsed ? triangleRight : triangleDown;
        const collapseCallback = function(node) {
            this.props.onSetCollapsed(node.id, !node.collapsed);
        }.bind(this, node);
        let body = <span style={textStyle}> {node.data.name} </span>;
        if (node.editing) {
            if ( this.props.options && this.props.options.editForm)
                body = this.props.options.editForm(node, this.props.onEdit)
            else
                body = <NodeEditForm node={node} onEdit={this.props.onEdit} />;
        }
        let editIcon = <span />;
        var enableEdit = config.enableEdit;
        if (this.props.options)
            enableEdit = Boolean(this.props.options.enableEdit);
        if (enableEdit) {
            editIcon =
                <span className={styles.pen}>
                    <EditIcon
                        setEditMode={this.props.onSetEditMode}
                        node={node} />
                </span>
            ;
        }

        return connectDragSource(connectDropTarget(
            <span key={'node:' + node.id} className="rdt_node">
                <a href="#notused" onClick={collapseCallback}>
                    <img src={triangle}
                        style={arrowStyle}
                        alt="Collapse/expand node"
                        className={styles.arrows} />
                </a>
                {body}
                {editIcon}
            </span>
        ));
    }
}

_Node.propTypes = {
    node: React.PropTypes.object.isRequired,
    onSetCollapsed: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onSetEditMode: React.PropTypes.func.isRequired,
    onDroppedInto: React.PropTypes.func.isRequired,
    connectDragSource: React.PropTypes.func.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired,
    highlighted: React.PropTypes.bool.isRequired,
    hovered: React.PropTypes.bool.isRequired
};


var Node = flow(
    DragSource(ItemTypes.NODE, nodeSource, nodeDragCollect),
    DropTarget(ItemTypes.NODE, nodeTarget, nodeDropCollect)
)(_Node);

export default Node;
