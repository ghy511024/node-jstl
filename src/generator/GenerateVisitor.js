const Node = require("../node/Node-Api");

class GenerateVisitor extends Node.Visitor {
    constructor() {
        super();
        this.tagVarNumbers = {};
    }

    /**
     * 覆盖父类visit 抽象方法
     */
    visit(n) {
        console.log("子类得 visit", n instanceof Node.CustomTag)
        if (n instanceof Node.CustomTag) {
            this._vCustomTag(n);
        }
    }

    /**
     * 不知道是不是拆出去好一点，先不拆，规模不大
     */
    _vCustomTag(n) {
        console.log("sdfsdf")
    }
}

GenerateVisitor.prototype = {
    tagVarNumbers: {},
    parent: "",
    isFragment: "",
    methodNesting: 0,
    arrayCount: 0,
    textMap: {},
}

module.exports = GenerateVisitor;