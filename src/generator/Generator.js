const Compiler = require("../Compiler")
const GenerateVisitor = require("./GenerateVisitor");

/**
 * @param outpath {String} 输出绝对路径
 * @param compiler {Compiler} 编译实例
 * @param page {Node.Nodes} 节点链表
 * @return
 */
class Generator {
    constructor() {

    }

    static generate(outpath, compiler, page) {
        let gen = new Generator(outpath, compiler);
        page.visit(new GenerateVisitor());
    }
}

module.exports = Generator;