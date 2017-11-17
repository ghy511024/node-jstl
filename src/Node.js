/**
 * Created by ghy on 2017/11/17.
 */

class Node {
    constructor() {

    }

}

Node.prototype = {
    body: null,//<Nodes>
    parent: null,//<Node>
    text: "",
    qName: "",
    startMark: null,
    localName: "",
    beginJSLine: 0,
    endJSLine: 0,
    root: null,
}

class Nodes {
    constructor() {

    }
}
Nodes.prototype = {
    list: [],
    root: null,
    generatedInBuffer: false
}

class Root extends Node {
    constructor() {
        super();
    }
}
Root.prototype = {
    parentRoot: null,
}
Node.Root = Root;

module.exports = Node;