# leamas's react-dnd-tree README

## General

This is a interactive, drag-and-drop and react-based treeview. It focuses on
the generic tree operations: move, rename, add and delete.

Main characteristics:

  - Based on react's drag and drop library.
  - Only two properties is really necessary to read data from server and
    to write it back.
  - More properties available for servers not allowing direct write of
    complete data.
  - Several components available to use the thing in different ways
  - Optimistic update strategy, data is updated without waiting for server.
  - The dependency list is. besides react, just lodash.
  - GPL licensed.

## Usage

The tree can be used in different ways. One way is using the UIBasicTree
interface. This is a plain tree allowing user to move and rename nodes.
Example code in demo1.js in master branch

Another option is using the default TreeView interface. This adds functionality
and UI where user can add and delete nodes in the tree. Example code in demo2.js
in branch demo2.

Here is also hooks for users who wants to add more properties than  just a name
to each  node. Using these hooks a user can redefine the form use to edit a node's
properties. Example code in demo3.js in branch demo3.

## Properties

### BasicTree

Unless stated, all properties are optional. See src/demo3.js for more info on
methods.

| Prop        | What                                                          |
|-------------|---------------------------------------------------------------|
| contents    | The actual data, see below. Mandatory.                        |
| onChange    | function onChange(contents) called when data is changed       |
| onEdit      | function onEdit(id, data), called when user edits a node.     |
| onMoveNode  | function(newParent, oldparent), called when user moves a node.|

## TreeView

Treeview adds more props to add/delete items:


| Prop            | What                                                     |
|-----------------|----------------------------------------------------------|
| onDeleteNode    | function onDelete(id), called when user deletes a node.  |
| onAddNode       | function onAddNode(nodes, text, id)  - user adds a node  |


## Data model

The tree is actually not really a tree but a forest - the root element is a list of
nodes. Each node is an object with some known properties

    - id: int, must be unique and > 0.
    - name: string, user visible label.
    . children: child list, possibly [].
    - collapsed: boolean, if child list is displayed or not.
    - editing: boolean, if child is currently editing the name.

The tree operations does not interfere with whatever other node
properties defined.


## Server interaction

All operations are done locally without waiting for server response. If the server
update fails, there is a ErrorMessage component which can be used - by default,
it displays a red box in the bottom-right display corner.

All changes of data triggers a call to the onChange function property. The other
function properties are also called as appropriate. User could use any way to
keep server updated.
