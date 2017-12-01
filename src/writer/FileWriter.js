/**
 * Created by ghy on 2017/12/1.
 */
const fs = require("fs");
const Writer = require("./Writer");
class FileWriter extends Writer {
    constructor(outFilePath) {
        super();
        this.filePath = outFilePath;
    }

    print(s) {
        this.write(s);
    }

    _write_str(s) {
        fs.appendFileSync(this.filePath, s);
    }

}