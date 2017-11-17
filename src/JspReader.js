/**
 * Created by ghy on 2017/11/17.
 */
const path = require("path");
const fs = require("fs");

const Ut = require("./Ut");
const Mark = require("./Mark");

class JspReader {
    constructor(baseDir, fname) {
        this.currFileId = 0;
        this.size = 0;
        this.singleFile = false;
        this.sourceFiles = [];
        this.pushFile(baseDir, fname, "utf-8");
    }

    getFile(fileId) {
        return this.sourceFiles[fileId];
    }

    hasMoreInput() {
        if (this.current.cursor >= this.current.length) {
            if (this.singleFile) {
                return false
            }
            while (this.popFile()) {
                if (this.current.cursor < this.current.stream.length) {
                    return true;
                }
            }
            return false;
        }
        return true;
    }

    nextChar() {

    }

    pushChar() {

    }

    getText() {

    }

    pushFile(baseDir, fname, encoding, reader) {
        let longName = fname;
        let fileid = this.registerSourceFile(longName);
        if (fileid == -1) {
            //TODO 报错异常
        }
        this.currFileId = fileid;
        let absPath = path.join(baseDir, longName)
        console.log(absPath)
        let fileStr = fs.readFileSync(absPath, "utf-8");
        let charArray = fileStr.split("");
        try {
            if (this.current == null) {

                this.current = new Mark(this, charArray, fileid, this.getFile(fileid), "utf-8")
            } else {
                this.current.pushStream(charArray, fileid, this.getFile(fileid), longName, "utf-8");
            }
            console.log(charArray.length)
        }
        catch (e) {
            console.log(e);
        }
    }

    popFile() {
        if (this.current == null || this.currFileId < 0) {
            return fasle;
        }
        let fname = this.getFile(this.currFileId);
        this.currFileId =

    }

    mark() {

    }

    reset() {

    }

    peekChar() {

    }

    registerSourceFile(fileName) {
        if (Ut.arrayContain(this.sourceFiles, fileName)) {
            return -1;
        } else {
            this.sourceFiles.push(fileName);
        }
        return this.sourceFiles.length - 1;
    }

    unregisterSourceFile(fileName) {
        if (Ut.arrayContain(this.sourceFiles, fileName)) {
            return -1;
        }
    }

    skipUntilETag() {

    }

    isSpace() {

    }

    parseToken() {

    }

    isDelimiter() {

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
module.exports = JspReader;