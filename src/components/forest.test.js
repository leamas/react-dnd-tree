import * as Forest from './forest.js';
import testdata from './../testdata.js';

test('init seems to setup forest', () => {
    var data = testdata;
    Forest.initNodes(data);
    expect(data[0].editing).toBe(false);
    expect(data[0].collapsed).toBe(false);
});

test('findNodeById finds an id', () => {
    var data = testdata;
    Forest.initNodes(data);
    const found = Forest.findNodeById(data, 93);
    expect(found.name).toBe("Kulturhuset");
});

test('findLargest finds the largest', () => {
    var data = testdata;
    Forest.initNodes(data);
    const found = Forest.findLargestId(data, 0);
    expect(found).toBe(203);
});

test('findParentNode finds the parent', () => {
    var data = testdata;
    Forest.initNodes(data);
    const parent = Forest.findParentNodeById(data, 93)
    expect(parent.id).toBe("4");
});

test('dropIntNode moves correctly', () => {
    var data = testdata;
    var newParent = Forest.findNodeById(data, 2);
    var oldlen = newParent.children.length;
    var result = Forest.dropIntoNode(data, 2, 96);
    expect(result.node.children.length).toBe(oldlen + 1);
    expect(result.node.children[0].id).toBe("96");
});

test('dropAfterNode moves correctly', () => {
    var data  =testdata;
    var oldParent = Forest.findParentNodeById(data, 36);
    expect(oldParent.id).toBe("3");
    var oldlen = oldParent.children.length;
    expect(oldlen).toBe(2);
    var result = Forest.dropAfterNode(data, 36, 96);
    expect(result.node.children[1].id).toBe("96");
    expect(result.node.children.length).toBe(oldlen + 1);
});

test('deleteNode works', () => {
    var data = testdata;
    const node = Forest.findNodeById(data, 203);
    expect(node.name).toBe("daghemmen");
    data = Forest.deleteNode(data, 203);
    expect(Forest.findNodeById(data, 203)).toBe(null);
});




