/**
 * Created by ghy on 2017/11/17.
 */
const Generator = require("./generator/Generator-Api");
const JspReader = require("./JspReader");
const Parser = require("./Parser");
const path = require("path");
const FileWriter = require("./writer/FileWriter")
const ServletWriter = require("./writer/ServletWriter")

class Compiler {
    constructor(baseDir) {
        this.baseDir = baseDir
    }

    compile(filename, outPath) {
        let t1, t2, t3, t4;
        try {
            this.doParser(filename, null, outPath);
        }
        catch (e) {
            console.log(e)
        }

    }

    getReader(filename) {
        let reader = new JspReader(this.baseDir, filename);
        return reader;
    }

    doParser(filename, parent, outPath) {
        let reader = this.getReader(filename);
        let pageNodes = Parser.parse(filename, reader, parent)
        console.log("=======================构造pagenode 结束==================")
        Generator.generate(outPath, this, pageNodes);
        // Generator.generateTree(outPath, this, pageNodes);
    }
}

module.exports = Compiler;