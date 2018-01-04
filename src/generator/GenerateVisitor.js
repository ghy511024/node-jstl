/**
 * 字符串直出
 * */

const Node = require ("../node/Node-Api");
const Tag = require ("../tag/Tag");
const visit_TemplateText = require ("./visitimpl/visit_TemplateText");
const PageContext = require ("../ctx/PageContext");

// tag 解析实现类
const ForEachIpml = require ("../tag/ipml/ForEachIpml");
const IfIpml = require ("../tag/ipml/IfIpml");

class GenerateVisitor extends Node.Visitor {
    constructor (out, pageContext) {
        super ();
        this.out = out;
        if (pageContext instanceof PageContext) {
            this.pageContext = pageContext;
        }
        this.tagVarNumbers = {};
        this.out = out;
    }

    /**
     * 覆盖父类visit 抽象方-----+-+法
     */
    visit (n) {
        console.log(n.name)
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
        console.log (n.qName, n.prefix, n.localName, n.uri)
        if (n.localName == "forEach") {
            let eachtag = new ForEachIpml ();
            eachtag.setPageContext (this.pageContext);
            eachtag.setVar (n.attrs.getValue ("var"));// "item"
            eachtag.setItems (n.attrs.getValue ("items"));// "${list1}"
            let each_val = eachtag.doStartTag ();
            if (each_val != Tag.SKIP_BODY) {
                while (true) {
                    this.visitBody (n)
                    let evalDoAfterBody = eachtag.doAfterBody ();
                    if (evalDoAfterBody != Tag.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
            }
        } else if (n.localName == "if") {
            let iftag = new IfIpml ();
            iftag.setPageContext (this.pageContext);
            iftag.setTest (n.attrs.getValue ("test"))

            let if_val = iftag.doStartTag ();
            if (if_val != Tag.SKIP_BODY) {
                this.visitBody (n);
            }
        }
        // this.visitBody(n)
    }

    _vNodes (n) {
        // console.log ("_vNodes")
    }

    _vRoot (n) {
        // console.log ("_vRoot")
        this.visitBody (n)
    }

    _vTemplateText (n) {
        // console.log ("_vTemplateText", n.text)
        this.out.print (n.text)
    }

    _vELExpression (n) {
        this.out.print (this.pageContext.getElValue (n.text))
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