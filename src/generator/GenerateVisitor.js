/**
 * 字符串直出
 * */

const Node = require ("../node/Node-Api");
const Tag = require ("../../test/tag/Tag");
const visit_TemplateText = require ("./visitimpl/visit_TemplateText");
const PageContext = require ("../../test/tag/PageContext");

// tag 解析实现类
const ForEachIpml = require ("../../test/tag/ipml/ForEachIpml");

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
        console.log ("统一调用我....")
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
        // console.log (n.qName)
        // console.log (n.prefix)
        // console.log (n.localName)
        // console.log (n.uri)
        // console.log(n.attrs)
        if (n.localName == "forEach") {
            let eachtag = new ForEachIpml ();
            eachtag.setPageContext (this.pageContext);
            eachtag.setVar (n.attrs.getValue ("var"));// "item"
            eachtag.setItems (n.attrs.getValue ("items"));// "${list1}"
            // console.log(n.attrs.getValue ("var"),n.attrs.getValue ("items"))
            let each_val = eachtag.doStartTag ();
            if (each_val != Tag.SKIP_BODY) {
                while (true) {
                    this.visitBody (n)
                    let evalDoAfterBody = eachtag.doAfterBody ();
                    console.log ("循环中....................", evalDoAfterBody)
                    if (evalDoAfterBody != Tag.EVAL_BODY_AGAIN) {
                        break;
                    }
                }
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
        console.log ("_vTemplateText", n.text)
        this.out.print (n.text)
        // console.log ("_vTemplateText")
        // console.log (n.text)
    }

    _vELExpression (n) {
        console.log ("el 表达式 输出", n.text, this.pageContext.getElValue (n.text))
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