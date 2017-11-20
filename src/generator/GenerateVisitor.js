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
        if (n instanceof Node.CustomTag) {
            this._vCustomTag(n);
        } else if (n instanceof Node.Nodes) {
            this._vNodes(n);
        }
        else if (n instanceof Node.Root) {
            this._vRoot(n);
        } else if (n instanceof Node.TemplateText) {
            this._vTemplateText(n);

        } else if (n instanceof Node.ELExpression) {
            this._vELExpression(n);
        }
    }

    /**
     * 不知道是不是拆出去好一点，先不拆，规模不大
     */
    _vCustomTag(n) {
        console.log("_vCustomTag")
        this.visitBody(n)
    }

    _vNodes(n) {
        console.log("_vNodes")
    }

    _vRoot(n) {
        console.log("_vRoot")
        this.visitBody(n)
    }

    _vTemplateText(n) {
        console.log("_vTemplateText")
        console.log(n.text)
    }

    _vELExpression(n) {
        console.log("_vELExpression")
        console.log(n.text);
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