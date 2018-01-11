/**
 * Created by ghy on 2018/1/4.
 */

const AstCompiler = require ("./AstCompiler");
class ELparser {
    static getValue (el, ctx) {
        return ELparser.getValueByLocal (el, ctx);
    }

    // 正规 ast 抽象语法树路线，解释器需要自己写，（目前就实现了基础表达式的解析）。
    static getValueByAst (el, ctx) {
        let astCompiler = new AstCompiler (ctx);
        let value = astCompiler.excute (el);
        return value;
    }

    // with 关键字，市面上的模版引擎基本都采用这套方案，代码量少，使用简单，其实最终执行环境还是走AST 那一套
    static getValueByLocal (el, ctx) {
        let str = "with(ctx){return " + el + "}";
        let fn = new Function ('ctx', str);
        let value = fn.call (ctx, ctx);
        return value;
    }
}
module.exports = ELparser;