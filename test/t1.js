/**
 * Created by ghy on 2017/11/17.
 */
const Compiler = require("../src/Compiler")
const path = require("path");
var T = {
    t1: function () {
        var dir = path.join(__dirname, "./jsp");
        let outPath = path.join(__dirname, "./out/xixi.jsp");

        let cp = new Compiler(dir)
        // cp.compileTofile ("x1.jsp", outPath)
        let str = cp.compile("x1.jsp", outPath)
        console.log(str);
    }
}
T.t1();