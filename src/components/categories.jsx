/* eslint no-console: off */
(console) ? console.log('Logging is supported.') : console.log=function(){} ;

import React, {Component}  from 'react';

import $ from 'jquery';

const API_URI = '/web/motor/admin/api/v4/categories';

import TreeView from 'treeview.jsx';
import ErrorMessage from 'error_message.jsx';
import * as Forest from 'forest.js';


// The main page contains the forest state and handles server
// updates.
export default class CategoriesPage extends Component {

    constructor(props) {
        super(props);
        this.state = {tree: [], errorMessage: null};
        this.runServerCommand = this.runServerCommand.bind(this);
        this.reload = this.reload.bind(this);
        this.addNode = this.addNode.bind(this);
        this.deleteNode = this.deleteNode.bind(this);
        this.moveNode = this.moveNode.bind(this);
        this.renameNode = this.renameNode.bind(this);
        this.onConfirmMsg = this.onConfirmMsg.bind(this);
    }

    runServerCommand(url, method, onSuccess, onError) {
        if (!onSuccess)
            onSuccess = function() { console.log('OK'); };
        if (!onError) {
            onError = function(url, xhr, status, err) {
                console.log('Error running ' + url, status, err.toString());
                this.setState({
                    errorMessage: 'Kommunikationsproblem med server'
                });
            }.bind(this, url);
        }
        console.log('Running url: ' + url);
        $.ajax({
            url: url,
            method: method,
            headers: {
                'x-csrf-token':
                    $('meta[name="csrf-token"]').attr('content')
            },
            cache: false,
            success: onSuccess,
            error: onError
        });
    }

    // Load table data from given url.
    reload(url) {
        this.runServerCommand(url, 'GET', function(nodes) {
            console.log('reload: success: ' + nodes.length);
            Forest.initNodes(nodes);
            this.setState({tree: nodes});
        }.bind(this));
    }

    // Add a node on the server, update local id with id from server.
    //   - nodes: Updated this.state.tree data
    //   - name: Name of new node
    //   - localId: Temporary id for the new node.
    //   - parentID: new node parent.
    addNode(nodes, name, localId, parentId) {
        let suffix = '?name=' + name;
        if (parentId)
            suffix += '&parent_id=' + parentId;
        const url = API_URI + suffix;
        const onSuccess = function(nodes, localId, serverNode) {
            console.log('Add: success, new id:' + serverNode.id);
            nodes = Forest.map(nodes, function(node){
                if (node.id == localId)
                    node.id = serverNode.id;
                return node;
            });
            this.setState({'tree': nodes});
            // Make sure server has an updated view on root nodes order.
            let root = {id: 0, name: 'root', children: nodes};
            this.moveNode(root);
        }.bind(this, nodes, localId);
        this.runServerCommand(url, 'POST', onSuccess);
    }

    // Delete a node on the server.
    deleteNode(id) {
        const suffix = '/' + id;
        const url = API_URI + suffix;
        this.runServerCommand(url, 'DELETE');
    }

    // Update the child list for a given node on server. If parent node
    // id == 0 the move is into the root level.
    moveNode(node) {
        const children = node.children.map(function (node) {
            return node.id;
        });
        const jsonChildren = JSON.stringify(children);
        const suffix =
            '/sort?parent_id=' + node.id + '&children=' + jsonChildren;
        const url = API_URI + suffix;
        this.runServerCommand(url, 'PUT');
    }

    // Rename a node  on the server.
    renameNode(id, name) {
        const suffix = '/' + id + '?name=' + name;
        const url = API_URI + suffix;
        this.runServerCommand(url, 'PUT');
    }

    // User confirmed error message, remove it.
    onConfirmMsg() {
        this.setState({errorMessage: null});
    }

    // Get device data from server when page is displayed.
    componentDidMount() {
        this.reload(this.props.url);
        this.setState({errorMessage: 'testing, testing'});
    }

    render() {
        const onChangeCallback =
            function(nodes) {this.setState({tree: nodes});}.bind(this);
        return (
            <div>
                <TreeView
                    contents={this.state.tree}
                    onChange={onChangeCallback}
                    onRenameNode={this.renameNode}
                    onDeleteNode={this.deleteNode}
                    onMoveNode={this.moveNode}
                    onAddNode={this.addNode} />
                <ErrorMessage
                    message={this.state.errorMessage}
                    onConfirm={this.onConfirmMsg} />
            </div>

        );
    }
}

CategoriesPage.propTypes = {
    url: React.PropTypes.string.isRequired
};

