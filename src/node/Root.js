const Node = require("./Node");

class Root extends Node {
    constructor() {
        super();
    }
}

Root.prototype = {
    parentRoot: null,
}
module.exports = Root;