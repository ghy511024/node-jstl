/**
 * Created by ghy on 2017/11/17.
 */
const JspReader = require("./JspReader");
const Parser = require("./Parser");
class Compiler {
    constructor(baseDir) {
        this.baseDir = baseDir
    }

    compile(filename) {
        let t1, t2, t3, t4;
        this.doParser(filename, null);
    }

    doParser(filename, parent) {
        let reader = new JspReader(this.baseDir, filename);
        Parser.parse(filename, reader, parent)
    }
}
module.exports = Compiler;