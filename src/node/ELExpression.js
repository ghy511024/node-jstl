const Node = require("./Node");

class ELExpression extends Node {
    constructor(text, start, parent) {
        super(null, null, null, start, parent);
        this.text = text;
    }
}

ELExpression.prototype = {
    el: null//ELNode.Nodes

}

module.exports = ELExpression;