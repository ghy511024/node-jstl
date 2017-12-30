/**
 * Created by ghy on 2017/11/17.
 */
const path=require("path")
const JspReader = require("./JspReader");
const Parser = require("./Parser");
// const Generator = require("./generator/Generator-Api");
const Generator = require("./generator/Generator-Api");

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
        let pageNodes = Parser.parse(filename, reader, parent)
        console.log("=======================构造pagenode 结束==================")
        // console.log(pageNodes.name);
        // console.log(pageNodes.list.length);
        Generator.generate(path.join(__dirname, "../out/outdemo.js"), this, pageNodes);
    }
}

module.exports = Compiler;