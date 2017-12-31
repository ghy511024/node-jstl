const TagSupport = require ("../TagSupport");
const Tag = require ("../Tag");
const ForEachSupport = require ("../ForEachSupport");

class ForEachIpml extends TagSupport {
    constructor () {
        super ();
        this.items = null;
        this.index = 0;
        this.count = 1;
        this.end = -1;
        this.begin = 0;
        this.step = 1;
        this.item = null;
        this.last = false;
        this.statusId = null;
    }

    hasNext () {
        return this.items != null && this.items.length > 0;
    }

    next () {
        return this.items.shift ();
    }

    setItems (o) {
        if (o == null) {
            this.rawItems = [];
        } else {
            this.rawItems = o;
        }
    }

    setVar (_id) {
        this.itemId = _id;
    }

    exposeVariables (firstTime) {
        if (this.itemId != null) {
            if (this.getCurrent () == null) {
                this.pageContext.removeAttribute (this.itemId)
            } else if (this.deferredExpression != null) {

            } else {
                this.pageContext.setAttribute (this.itemId, this.getCurrent ())
            }
        }
    }


    discard (n) {
        let oldIndex = this.index;
        while (n-- > 0 && !this.atEnd () && this.hasNext ()) {
            this.index++;
            this.next ();
        }
        this.index = oldIndex;
    }

    doStartTag () {
        if (this.end != -1 && this.begin > this.end) {
            return
        }
        this.index = 0;
        this.count = 1;
        this.last = false;
        this.iteratedExpression = null;
        this.deferredExpression = null;

        // 将设置的 ${list} el 表达式赋值给 pagecontext
        console.log (this.items, "赋值 begin")
        this.prepare ();
        console.log (this.items, "赋值 end")
        // 设置了开始标签，直接从开始标签起步
        this.discardIgnoreSubset (this.begin);
        if (this.hasNext ()) {
            this.item = this.next ();
        } else {
            return Tag.SKIP_BODY;
        }
        this.discard (this.step - 1);

        // 设置临时变量，比如循环中第一个object 赋值为 item
        this.exposeVariables (true);
        this.calibrateLast ();
        return Tag.EVAL_BODY_INCLUDE;
    }


    doAfterBody () {
        this.index += this.step - 1;
        this.count++;
        if (this.hasNext () && !this.atEnd ()) {
            this.index++;
            this.item = this.next ();
        } else {
            return Tag.SKIP_BODY;
        }

        this.discard (this.step - 1)
        this.exposeVariables (false);
        this.calibrateLast ();
        return Tag.EVAL_BODY_AGAIN;
    }

    /**
     * 将 rawItems 转换设置为items
     * */
    prepare () {
        if (this.rawItems != null) {
            if (typeof this.rawItems == "string") {
                this.rawItems = this.pageContext.getElValue (this.rawItems)
            }
            this.items = this.rawItems;
        } else {
            // 没有items 就使用begin ,end
            this.items = this.beginEndForEachIterator ();
        }

    }

    discardIgnoreSubset (n) {
        while (n-- > 0 && this.hasNext ()) {
            this.next ();
        }
    }

    atEnd () {
        return ((this.end != -1) && (this.begin + this.index >= this.end));
    }

    calibrateLast () {
        this.last = !this.hasNext () || this.atEnd () || (this.end != -1 && (this.begin + this.index + this.step > end));
    }

    beginEndForEachIterator () {
        let ia = [];
        for (let i = 0; i <= end; i++) {
            ia[i] = i;
        }
        return ia;
    }

    getCurrent () {
        return this.item;
    }
}

module.exports = ForEachIpml;