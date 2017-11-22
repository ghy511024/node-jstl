const TagSupport = require("./TagSupport");

class ForEachSupport extends TagSupport {
    constructor() {
        super();
    }

    supportedTypeForEachIterator(o) {
        if (o instanceof String) {

        }
    }

    hasNext() {
        return this.items != null && this.items.length > 0;
    }

    next() {
        return this.items.pop();
    }

    prepare() {
        if (this.rawItems != null) {
            items = this.supportedTypeForEachIterator(this.rawItems);
        } else {
            let ia = [];
            for (let i = 0; i < this.end; i++) {
                ia[i] = i;
            }
            //todo 逻辑没写完，20171123：01：58 返回一个基础的迭代器实现类
            // return new SimpleForEachIterator();

        }

    }

    module
.
    exports = ForEachSupport;