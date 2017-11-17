/**
 * Created by ghy on 2017/11/17.
 */

const Ut = require ("UT");
class JspReader {
    constructor (fname) {
        this.currFileId = 0;
        this.size = 0;
        this.singleFile = false;
        this.pushFile (fname, "utf-8");
        this.sourceFiles = [];
    }

    getFile (fileId) {
        return this.sourceFiles[fileId];
    }

    hasMoreInput () {

    }

    nextChar () {

    }

    pushChar () {

    }

    getText () {

    }

    pushFile (fname, encoding, reader) {
        let longName = fname;
        let fileid = this.registerSourceFile (longName);
        if (fileid == -1) {
            //TODO 报错异常
        }
        this.currFileId = fileid;
        let fileStr = fs.readFileSync (filePath, "utf-8");
        let charArray = fileStr.split ("");
        try {
            if (this.current == null) {

                this.current = new Mark (this, charArray, fileid, this.getFile (fileid), "utf-8")
            } else {
                this.current.pushStream (charArray, fileid, this.getFile (fileid), longName, "utf-8");
            }
        }
        catch (e) {

        }
    }

    popFile () {

    }

    mark () {

    }

    reset () {

    }

    peekChar () {

    }

    registerSourceFile (fileName) {
        if (Ut.arrayContain (this.sourceFiles, fileName)) {
            return -1;
        } else {
            this.sourceFiles.push (fileName);
        }
        return sourceFiles.length - 1;
    }


    skipUntilETag () {

    }

    isSpace () {

    }

    parseToken () {

    }

    isDelimiter () {

    }
}
JspReader.prototype = {
    current: null,//Mark
    master: "",
    sourceFiles: [],
    currFileId: 0,
    size: 0,
    singleFile: true
}