const Node = require ("../node/Node-Api");

class GenerateVisitor extends Node.Visitor {
    constructor (out) {
        super ();
        this.tagVarNumbers = {};
        this.out = out;
    }

    /**
     * 覆盖父类visit 抽象方法
     */
    visit (n) {
        // console.log (n.name);
        if (n instanceof Node.CustomTag) {
            this._vCustomTag (n);
        } else if (n instanceof Node.Nodes) {
            this._vNodes (n);
        }
        else if (n instanceof Node.Root) {
            this._vRoot (n);
        } else if (n instanceof Node.TemplateText) {
            this._vTemplateText (n);

        } else if (n instanceof Node.ELExpression) {
            this._vELExpression (n);
        }
    }

    /**
     * 不知道是不是拆出去好一点，先不拆，规模不大
     */
    _vCustomTag (n) {
        console.log ("_vCustomTag")
        console.log(n.qName)
        console.log(n.prefix)
        console.log(n.localName)
        console.log(n.uri)
        console.log(n.attrs)
        this.visitBody (n)

    }

    _vNodes (n) {
        // console.log ("_vNodes")
    }

    _vRoot (n) {
        // console.log ("_vRoot")
        this.visitBody (n)
    }

    _vTemplateText (n) {
        this.out.print(n.text)
        // console.log ("_vTemplateText")
        // console.log (n.text)
    }

    _vELExpression (n) {
        // console.log ("_vELExpression")
        // console.log (n.text);
        this.out.print(n.text)
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