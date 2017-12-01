/**
 * Created by ghy on 2017/12/1.
 */
/**
 * // 这儿需要根据不同的平台来判断，
 *  lineSeparator = java.security.AccessController.doPrivileged(
 new sun.security.action.GetPropertyAction("line.separator"));
 *
 * windows下的文本文件换行符:\r\n
 linux/unix下的文本文件换行符:\r
 Mac下的文本文件换行符:\n
 * */
const lineSeparator = "\n";

class PrintWriter {

    constructor (out) {
        this.out = out;
    }

    write (...arg) {
        if (arg.length == 1) {
            this._write_str_1 (arg)
        }
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
        this.out.write (lineSeparator);
    }

    newLine () {

    }

    _write_str_1 (str) {
        this.out.write (str);
    }


}
module.exports = PrintWriter;