# leamas's react-dnd-tree README

## General

This is a interactive, drag-and-drop and react-based treeview. It focuses on
the generic tree operations: move, rename, add and delete.


![Screenshot](misc/screendump.png)


Main characteristics:

  - Based on react's drag and drop library.
  - Stateless.
  - Server can be updated using a single onChange property or using
    properties fired at specific events.
  - Several components available to use the thing in different ways
  - Optimistic update strategy, data is updated without waiting for server.
  - The dependency list is, besides react, just lodash.
  - GPL licensed.

## Usage

The tree can be used in different ways. One way is using the UIBasicTree
interface. This is a plain tree allowing user to move and rename nodes.
Example code in [src/demo1.js](src/demo1.js)

Another option is using the default TreeView interface. This adds functionality
and UI where user can add and delete nodes in the tree. Example code in
[src/demo2.js](src/demo2.js), screenshot above and a live demo at
http://mumin.crabdance.com.

Here is also hooks for users who wants to add more properties than  just a name
to each  node. Using these hooks a user can redefine the form use to edit a
node's properties. Example code in [demo3.js](src/demo3.js).

In general, you should be able to pick one of the demos and adapt it by
implementing the stub routines receiving and writing server data. It is also
possible to combine the basic components like BasicTree, AddTool and Trashcan
into new layouts and functionalities.

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
nodes. Each node is an object with some known properties:

 - id: int, must be unique and > 0.
 - data: object. The node's edited properties. By default just the user
   visible label data.name is defined.
 - children: child list, possibly [].
 - collapsed: boolean, if child list is displayed or not.
 - editing: boolean, if node is currently being edited.

The tree operations does not interfere with whatever other node
properties defined.


## Server interaction

All operations are done locally without waiting for server response. If the server
update fails, there is a ErrorMessage component which can be used - by default,
it displays a red box in the bottom-right display corner.

All changes of data triggers a call to the onChange function property. The other
function properties are also called as appropriate. User could use any way to
keep server updated.

## Caveats

react-dnd-tree uses css modules. config/webpack\*.conf has been updated to support
this, and it shouldn't be a concern unless cloning the code.

The dnd capabilities depends os a single, global DragDropContext. The Treeview and
teh UIBasicTree components defines such a context, and using any of these makes it
impossible to use dnd in other parts of the application. You might want to use
BasicTree, AddTool and Trashcan and declare the DragDropContext in the main app
should this became a problem.
