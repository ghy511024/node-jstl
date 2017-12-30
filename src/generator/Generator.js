const Compiler = require("../Compiler")
const GenerateVisitor = require("./GenerateVisitor");
const FileWriter = require("../../src/writer/FileWriter");
const StringWriter = require("../../src/writer/StringWriter");
const ServletWriter = require("../../src/writer/ServletWriter");
const PageContext = require("../../test/tag/PageContext");

/**
 * @param outpath {String} 输出绝对路径
 * @param compiler {Compiler} 编译实例
 * @param page {Node.Nodes} 节点链表
 * @return
 */
class Generator {
    constructor(out) {
        this.out = out;
    }

    static generateJS(outpath, compiler, page) {
        let fileWriter = new FileWriter(outpath);
        let out = new ServletWriter(fileWriter);
        let gen = new Generator(out, compiler);
        gen.generatePreamble(page)
        page.visit(new GenerateVisitor(out));
    }

    // 默认输出模式，内存渲染
    static generate(outpath, compiler, page) {
        let fileWriter = new FileWriter(outpath);
        let out = new ServletWriter(fileWriter);
        let data = {ghy: "1",list1:[{a:"vv"},{a:"bb"}]}
        let pageContext = new PageContext(data);
        page.visit(new GenerateVisitor(out,pageContext));
    }

    /**
     * 生成头部信息
     * @param page {Node.Nodes}
     * */
    generatePreamble(page) {
        let out = this.out;
        out.print("class");
        out.printil(" demojs {");
        out.printil("constructor() {");
        out.print("}");
        out.pushIndent();
        this.genPreambleMethods();
        out.printil("outjs(data){");
        out.printil("let _jspx_page_context = new PageContext(data);")
        out.printil("try {")

    }

    /**
     * 生成方法
     * */
    genPreambleMethods() {

    }

    genPreamblePackage(packageName) {

    }
}

module.exports = Generator;