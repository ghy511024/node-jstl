const SKIP_BODY = 0;
const EVAL_BODY_INCLUDE = 1;
const SKIP_PAGE = 5;
const EVAL_PAGE = 6;

const TagSupport = require("../TagSupport");
const ForEachSupport = require("../ForEachSupport");

class ForEachIpml extends ForEachSupport {
    constructor() {
        super();
        this.end;
        this.begin;
    }
    doStartTag() {
        if (this.end != -1 && this.begin > this.end) {
            return
        }
        this.index = 0;
        this.count = 1;
        this.last = false;
        this.iteratedExpression = null;
        this.deferredExpression = null;
    }

    discard(n) {
        let oldIndex = this.index;
        while (n-- > 0 && !this.atEnd() && this.hasNext()) {
            this.index++;
            this.next();
        }
        this.index = oldIndex;
    }

    doAfterBody() {
        this.index += step - 1;
        this.count++;
        if (this.hasNext() && this.atEnd()) {
            this.index++;
            this.item = this.next();
        } else {
            return SKIP_BODY;
        }
        return EVAL_BODY_AGAIN
    }

    prepare() {
        //console.log("sdf")

    }

    discardIgnoreSubset() {
        while (n-- > 0 && hasNext()) {
            next();
        }
    }
}

module.exports = ForEachIpml;