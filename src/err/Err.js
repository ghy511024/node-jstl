/**
 * Created by ghy on 2018/1/11.
 */
const Node = require("../node/Node-Api");
const Mark = require("../compile/Mark");

class jspErr {
    constructor() {

    }

    static err(node, msg, e) {
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
        let tmpText = jspErr.getErrInfo(mark, 2, 2)
        msginfo += "\n" + tmpText;
        throw  new Error(msginfo);
    }

    static getErrInfo(mark, preline, nextline) {
        let retstr = "";
        for (let i = 0; i <= preline; i++) {
            let start = Mark.newMark(mark);
            start.resetLine(mark.line - preline + i);
            retstr += start.line + " " + mark.reader.getTextline(start, start.line)
        }
        for (let i = 0; i < mark.col+3; i++) {
            retstr += " ";
        }
        retstr += "↑";
        retstr += "\n";
        for (let i = 1; i < nextline; i++) {
            let start = Mark.newMark(mark);
            start.resetLine(mark.line + i);
            retstr += start.line + " " + mark.reader.getTextline(start, start.line)
        }
        return retstr;
    }
}

module.exports = jspErr;
