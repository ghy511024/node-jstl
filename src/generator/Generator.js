const Compiler = require ("../Compiler")
const GenerateVisitor = require ("./GenerateVisitor");
const GenerateVisitor_tree = require ("./GenerateVisitor_tree");
const FileWriter = require ("../../src/writer/FileWriter");
const StringWriter = require ("../../src/writer/StringWriter");
const ServletWriter = require ("../../src/writer/ServletWriter");
const PageContext = require ("../ctx/PageContext");

/**
 * @param outpath {String} 输出绝对路径
 * @param compiler {Compiler} 编译实例
 * @param page {Node.Nodes} 节点链表
 * @return
 */
class Generator {
    constructor (out) {
        this.out = out;
    }

    static generateTree (outpath, compiler, page) {
        let a = new GenerateVisitor_tree ()
        page.visit (a);
        console.log (JSON.stringify (a.getTree ()));
    }

    /**
     * 输出到文件中，主要是调试用
     * */
    static generateFile (outpath, compiler, page) {
        let fileWriter = new FileWriter (outpath);
        let out = new ServletWriter (fileWriter);
        let data = {
            num1: "1",
            list1: [
                { a: [1, true,] },
                { a: [{ "x": "dd" }, [1, 2, 3]] }]
        }
        let pageContext = new PageContext (data);
        page.visit (new GenerateVisitor (out, pageContext, compiler));
    }

    /**
     * 最终线上express用的时候，会采用字符串形式输出
     * */
    static generateStr (data, compiler, page) {
        let fileWriter = new FileWriter (outpath);
        let out = new ServletWriter (fileWriter);
    }

}

module.exports = Generator;