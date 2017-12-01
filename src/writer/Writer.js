/**
 *
 * 这个应该是一个抽象类
 *
 */
const Abstract = require("../object/Abstract");
const lineSeparator = "\r\n";
class Writer extends Abstract {
    constructor() {
        super();
        this.str = "";
        this.count = 0;
    }

    print(s) {
        if (s == null) {
            s = "null";
        }
        this.write(s);
    }

    write(...args) {
        this.DT("write", args)
    }

    _write_str(s) {
        this.str += str;
    }

    println() {
        if (x != null) {
            this.print(x);
        }
        console.log("换行操作")
        this.write(lineSeparator);
    }

    toString() {
        return this.str;
    }

}
//
// let w = new Writer();
// w.test(1, "sdf");
// w.test();
// w.test({}, [1, 2], "sdf", 3, true);
// w.test(3, true);
module.exports = Writer;