/**
 * Created by ghy on 2017/11/17.
 */
const Generator = require("./generator/Generator-Api");
const JspReader = require ("./JspReader");
const Parser = require ("./Parser");
const path = require ("path");
const FileWriter=require("./writer/FileWriter")
const ServletWriter=require("./writer/ServletWriter")

class Compiler {
    constructor (baseDir) {
        this.baseDir = baseDir
    }

    compile (filename,outPath) {
        let t1, t2, t3, t4;
        this.doParser (filename, null,outPath);
    }

    doParser (filename, parent,outPath) {
        let reader = new JspReader (this.baseDir, filename);
        let pageNodes = Parser.parse (filename, reader, parent)
        console.log ("=======================构造pagenode 结束==================")
        // this.testNode (pageNodes);
        console.log ("=======================构造gennerator 访问 结束==================")
        Generator.generate (outPath, this, pageNodes);
    }

    testNode (pageNodes) {
        // console.log (pageNodes.root == null)
        // console.log (pageNodes.list.length)
        let m = 0;

        tnode (pageNodes, 0)

        function tnode (nodes, m) {

            let root = nodes.root;
            let array = nodes.list;
            // console.log ("root==null", root == null);
            if (array != null) {
                // console.log (array.length, "arraylentth")
            }
            for (let i = 0; i < array.length; i++) {
                let node = array[i];
                if (node != null) {
                    // console.log ("层数", m)
                    let bnodes = node.body;
                    console.log (node.name)
                    if (node.name = "TemplateText") {
                        // console.log (node.text);
                    } else if (node.name = "customTag") {
                        // console.log (node.qName);
                    } else if (node.name = "ELExpression") {
                        // console.log (node.text);
                    }
                    if (bnodes != null) {
                        tnode (bnodes, (m + 1));
                    }
                }
            }
        }
    }
}

module.exports = Compiler;