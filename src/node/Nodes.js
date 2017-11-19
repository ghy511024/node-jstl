const Node = require("./Node");

class Nodes {

    constructor() {
        this.list = [];
    }

    add(n) {
        this.list.push(n);
        this.root = null;
    }

}

Nodes.prototype = {
    list: [],
    root: null,
    generatedInBuffer: false
}

module.exports = Nodes;