/**
 * Created by ghy on 2017/12/1.
 */
const Writer = require ("./Writer");

/**
 * // 这儿需要根据不同的平台来判断，
 *  lineSeparator = java.security.AccessController.doPrivileged(
 new sun.security.action.GetPropertyAction("line.separator"));
 *
 * windows下的文本文件换行符:\r\n
 linux/unix下的文本文件换行符:\r
 Mac下的文本文件换行符:\n
 * */
const lineSeparator = "\r\n";
class StringWriter extends Writer {
    constructor () {
        super ();
        this.str = "";
        this.count = 0;// js 数组不用申明长度，就可以无限增加，与java 不同，java 需要申明指定长度

    }

    print (s) {
        if (s == null) {
            s = "null";
        }
        this.write (s);
    }

    println (x) {
        if (x != null) {
            this.print (x);
        }
        console.log ("换行操作")
        this.write (lineSeparator);
    }

    write (...arg) {
        if (arg.length == 1) {
            this._write_str (arg)
        }
    }

    _write_str (str) {
        this.str += str;
    }

    toString () {
        return this.str;
    }
}
// let m = new StringWriter ();
// m.write (1);
// m.write (4);
// m.write (1);
// m.write (6);
//
// console.log (m.toString ());
module.exports = StringWriter;