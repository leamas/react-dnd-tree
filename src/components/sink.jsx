//
// The drop target between each node
//

/* eslint no-console: off */
(console) ? console.log('Logging is supported.') : console.log=function(){} ;

import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';

import {ItemTypes} from './commons.js';

// Handle items (nodes) dropped into the sink (after a node).
const sinkTarget = {
    drop: function(props, monitor) {
        const item = monitor.getItem();
        props.onDroppedInto(props.peerId, item.id);
    }
};


// Collected properties for a sink (between nodes).
function sinkCollect(connect, monitor) {
    return {
        highlighted: monitor.canDrop(),
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver()
    };
}


// Drop area between children.
class _Sink extends Component {

    render() {
        const connectDropTarget = this.props.connectDropTarget;
        const width = '' +  (this.props.indent + 4) + 'em';
        const visibility = this.props.hovered ? 'visible' : 'hidden';
        const color = this.props.hovered ? '#949494' : 'transparent';
        const height = this.props.hovered ? '0.6em' : '0.25em';
        const boxStyle = {
            display: 'inline-block',
            height: height,
            visibility: visibility
        };
        const divStyle = {
            width: this.props.width,
            maxWidth: this.props.width,
            marginLeft: width,
            height: height,
            backgroundColor: color,
        };
        return connectDropTarget(
            <div style={divStyle} className="rdt_sink">
                <span style={boxStyle} />
            </div>
        );
    }
}

_Sink.propTypes  = {
    indent: React.PropTypes.number.isRequired,
    width: React.PropTypes.string.isRequired,
    peerId: React.PropTypes.number.isRequired,
    onDroppedInto: React.PropTypes.func.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired,
    highlighted: React.PropTypes.bool.isRequired,
    hovered: React.PropTypes.bool.isRequired
};

const Sink = DropTarget(ItemTypes.NODE, sinkTarget, sinkCollect)(_Sink);
export default Sink;
