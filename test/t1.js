/**
 * Created by ghy on 2017/11/17.
 */
const Compiler = require("../src/compile/Compiler")
const jstl = require("../src/index");
const path = require("path");
var T = {
    t1: function () {
        var dir = path.join(__dirname, "./jsp");
        let outPath = path.join(__dirname, "./out/xixi.jsp");

        let cp = new Compiler(dir)
        // cp.compileTofile ("x1.jsp", outPath)
        let data = {
            num1: "1",
            list1: [
                {a: [1, true,]},
                {a: [{"x": "dd"}, [1, 2, 3]]}]
        }
        let str = cp.compile("x1.jsp", data)
        console.log(str);
    },
    t2: function () {
        var jsppath = path.join(__dirname, "./jsp/x1.jsp");
        jstl.setBaseDir(path.join(__dirname, "./jsp"))
        let data = {
            num1: "1",
            list1: [
                {a: [1, true,]},
                {a: [{"x": "dd"}, [1, 2, 3]]}]
        }
        var str = jstl.compile(jsppath, data);
        console.log(str);
    }
}
T.t2();