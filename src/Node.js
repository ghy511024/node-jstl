/**
 * Created by ghy on 2017/11/17.
 */

class Node {

    static Root = Root;
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
    root: Root,
}

class Nodes {

}
Nodes.prototype = {
    list: [],
    root: null,
    generatedInBuffer: false
}

class Root extends Node {

}
Root.prototype = {
    parentRoot: null,
}