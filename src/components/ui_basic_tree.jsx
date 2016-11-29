//
// The categories treeview.
//
// DragDrop context on top of _BasicTree for standalone use.


import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BasicTree from './basic_tree.jsx';

const UIBasicTree = DragDropContext(HTML5Backend)(BasicTree);
export default UIBasicTree;
