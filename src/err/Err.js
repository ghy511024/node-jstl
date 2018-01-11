/**
 * Created by ghy on 2018/1/11.
 */
const Node = require ("../node/Node-Api");
const Mark = require ("../Mark");
class jspErr {
    constructor () {

    }

    static err (node, msg, e) {
        let mark
        if (node instanceof Node) {
            mark = node.mark;
        } else if (node instanceof Mark) {
            mark = node;
        }

        let line = mark.line;
        let col = mark.col;
        let name = mark.name;
        var msginfo = "err position:(" + line + "," + col + ")";
        console.log ("mark", mark.line, mark.col, mark.cursor);
        let start = Mark.newMark (mark);
        let stop = Mark.newMark (mark);
        start.resetLine (mark.line - 2)
        stop.line = mark.line + 1;
        console.log ("start", start.line, start.col, start.cursor);
        let tmpText = mark.reader.getTextline (start, start.line + 4);
        msginfo += "\n" + tmpText;
        throw  new Error (msginfo);
    }

    static getErrInfo () {

    }
}
module.exports = jspErr;
