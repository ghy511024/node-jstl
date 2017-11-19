const Node = require("./Node");

class Nodes {

    constructor(root) {
        this.root = root;
        this.list = [];
        this.list.add(root);
    }

    add(n) {
        this.list.push(n);
        this.root = null;
    }

    /**
     * 设计模式之 访问模式
     * @abstract
     * @param v {Visitor}
     */
    visit(v) {
        let iter = this.list;
        let item = iter.pop();
        while (item != null) {
            item.accept(v);
            item = iter.pop();
        }
    }

}

Nodes.prototype = {
    list: [],
    root: null,
    generatedInBuffer: false
}

module.exports = Nodes;