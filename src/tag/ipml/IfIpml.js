const TagSupport = require ("../TagSupport");
const Tag = require ("../Tag");
const ForEachSupport = require ("../ForEachSupport");

class IfIpml extends TagSupport {
    constructor () {
        super ();
        this.test = false;
        this.result = false;
        this.var;
    }

    setTest (el) {

        if (typeof el == "boolean") {
            this.test = el;
            console.log ("aaaaaaaaaaaaaaaaaaaaaaaaaa", el)
        } else if (typeof el == "string") {
            this.test = this.pageContext.getElValue (el);
            console.log ("bbbbbbbbbbbbbbbbbbbbbb", el, this.test)
        }
    }

    exposeVariables (firstTime) {
        if (this.var != null) {
            this.pageContext.setAttribute (this.var, this.result);
        }
    }


    condition () {
        return this.test;
    }

    doStartTag () {
        this.result = this.condition ();
        this.exposeVariables ();
        if (this.result)
            return Tag.EVAL_BODY_INCLUDE;
        else
            return Tag.SKIP_BODY;
    }


    doAfterBody () {
        return Tag.SKIP_BODY;
    }

}

module.exports = IfIpml;