/**
 * 这个方案是针对，在内存中计算出模板字符串，而不是生成js 文件，考虑到，
 * 动态成成js 不太好调用，而且产生垃圾文件，对于git 提交不太友好
 *
 * */

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
        console.log("统一调用我....")
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