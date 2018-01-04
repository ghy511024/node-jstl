/**
 * Created by ghy on 2018/1/4.
 */

const AstCompiler = require ("./AstCompiler");
class ELparser {
    static getValue (el, ctx) {
        let astCompiler = new AstCompiler (ctx);
        let value = astCompiler.excute (el);
        return value;
    }
}
module.exports = ELparser;