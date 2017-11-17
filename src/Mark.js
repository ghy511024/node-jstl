/**
 * 标记类，辅助字符串输入操作
 * @author ghy
 * @date 20171117
 *
 */
class Mark {
    constructor (reader, stream, fileid, name, baseDir, encoding) {
        this.reader = reader;
        this.baseDir = baseDir;
        this.stream = stream;
        this.fileId = fileid;
        this.encoding = encoding;
        this.name = name;
        this.col = 1;
        this.line = 1;
        this.cursor = 0;
        this.includeStack = [];
    }

    getIncludeMark (inCursor, inLine, inCol, inFileid, name, inBaseDir, inEncoding, inStream) {
        let mark = new Mark (null, inStream, inFileid, name, inBaseDir, inEncoding);
        mark.col = inCol;
        mark.cursor = inCursor;
        mark.line = inLine;
        return mark;
    }

    // get one from other
    copyMark () {

    }

    /**
     * 文件流压栈操作
     * @param inStream {Array<Char>} new stream for mark
     * @param inFileid {Integer}
     * @param name {String}
     * @param inBaseDir {String}
     * @param inEncoding {String}
     * @returns null
     */
    pushStream (inStream, inFileid, name, inBaseDir, inEncoding) {
        // 当前文件mark压栈
        this.includeStack.push (this.getIncludeMark (this.cursor, this.line, this.fileId, this.fileName, this.baseDir, this.encoding, this.stream))
        this.cursor = 0;
        this.line = 1;
        this.col = 1;
        this.fileId = inFileid;
        this.fileName = name;
        this.baseDir = inBaseDir;
        this.encoding = inEncoding;
        this.stream = inStream;

    }

    popStream () {

    }

    showP () {

    }
}
Mark.prototype = {
    reader: null,
    cursor: 1,
    line: 1,
    col: 0,
    fileId: 0,
    fileName: 0,
    includeStack: [],
    stream: null,//Buffer
    encoding: "utf-8",
    fileName: "",
    baseDir: "",
}