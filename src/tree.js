// The main view with a dnd tree + trashcan and add tool.
import TreeView from './components/treeview.jsx';

// Just the tree without any add/delete components.
import UIBasicTree from './components/ui_basic_tree.jsx';

// Same as UIBasicTree but without a DragDropContext
import BasicTree from './components/basic_tree.jsx';

// The + tool in TreeView.
import AddTool from './components/add_tool.jsx';

// The TreeView trashcan
import Trashcan from './components/trashcan.jsx';

// Testdata used in demos.
import testdata from './testdata.js';

// Error message utility class
import ErrorMessage from './components/error_message.jsx';

export default TreeView
export {testdata, UIBasicTree, BasicTree, AddTool, Trashcan, ErrorMessage}
