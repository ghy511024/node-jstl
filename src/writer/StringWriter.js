/**
 * Created by ghy on 2017/12/1.
 */
const Writer = require ("./Writer");

class StringWriter extends Writer {
    constructor () {
        super ();
        this.str = "";
    }

    _write_str (s) {
        this.str += str;
    }

    toString () {
        return this.str;
    }
}
module.exports = StringWriter;