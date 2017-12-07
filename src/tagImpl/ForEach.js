/**
 * 实现forEach 输出
 */

class ForEach {
    constructor () {

    }

    static parse (node, fun) {
        let attr = node.attrs;
        let _items = attr.getValue ("items");
        let _var = attr.getValue ("var");
        let begin = attr.getValue ("begin");
        let end = attr.getValue ("end");
    }

}