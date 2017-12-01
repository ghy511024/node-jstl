/**
 *
 * 这个应该是一个抽象类
 *
 */
const Abstract = require ("../object/Abstract");
class Writer extends Abstract {

    print () {

    }

    write (...args) {
        this.DT ("write", args)
    }

    println () {

    }

}

let w = new Writer ();
w.test (1, "sdf");
w.test ();
w.test ({}, [1, 2], "sdf", 3, true);
w.test (3, true);
module.exports = Writer;