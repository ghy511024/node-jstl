/**
 * 实现forEach 输出
 */

class ForEach {
    constructor () {

    }

    static parse (node,_context, fun) {
        let attr = node.attrs;
        let $items = attr.getValue ("items");
        let _var = attr.getValue ("var");
        let begin = attr.getValue ("begin");
        let end = attr.getValue ("end");
        let _item_data=_context.getEldata($items);
    }

}