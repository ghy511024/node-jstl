const SKIP_BODY = 0;
const EVAL_BODY_INCLUDE = 1;
const SKIP_PAGE = 5;
const EVAL_PAGE = 6;

class ForEachTag {
    constructor() {
        this.rawItems = null;
        this.end;
        this.begin;
    }

    setPageContext() {

    }

    setItems(o) {
        if (o == null) {
            this.rawItems = [];
        } else {
            this.rawItems = o;
        }
    }

    setVar(_id) {
        this.itemId = _id;
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

    prepare() {

    }

    discardIgnoreSubset() {
        while (n-- > 0 && hasNext()) {
            next();
        }
    }
}