/**
 * Created by ghy on 2017/11/17.
 */
const Generator = require("./generator/Generator-Api");
const JspReader = require("./JspReader");
const Parser = require("./Parser");
const path = require("path");
const FileWriter = require("./writer/FileWriter")
const StringWriter = require("./writer/StringWriter");
const ServletWriter = require("./writer/ServletWriter")

class Compiler {
    constructor(baseDir) {
        this.baseDir = baseDir
    }

    compileTofile(filename, outPath) {
        try {
            this.doParserFile(filename, null, outPath);
        }
        catch (e) {
            console.log(e)
        }

    }

    compile(filename, outPath) {
        let stringWriter = new StringWriter();
        let out = new ServletWriter(stringWriter);
        try {
            this.doParser(filename, null, out);
        }
        catch (e) {
            console.log(e)
        }
        finally {
            return out.toString();
        }

    }

    getReader(filename) {
        let reader = new JspReader(this.baseDir, filename);
        return reader;
    }

    doParser(filename, parent, out) {
        let reader = this.getReader(filename);
        let pageNodes = Parser.parse(filename, reader, parent)
        console.log("=======================构造pagenode 结束==================")
        let data = {
            num1: "1",
            list1: [
                {a: [1, true,]},
                {a: [{"x": "dd"}, [1, 2, 3]]}]
        }
        Generator.generateStr(data, this, out, pageNodes);
        // Generator.generateTree(outPath, this, pageNodes);
    }
}

module.exports = Compiler;