/**
 * Created by ghy on 2017/12/1.
 * http://nodejs.cn/api/fs.html#fs_fs_writefilesync_file_data_options
 */

const fs = require ("fs");
const Writer = require ("./Writer");
class FileWriter extends Writer {
    constructor (outFilePath) {
        super ();
        this.filePath = outFilePath;
        console.log(this.filePath,"bbbbbbbbbbbyyyyyyyyyyy");
        fs.writeFileSync (this.filePath, "");
    }

    _write_str (s) {
        fs.appendFileSync (this.filePath, s);
    }

}
module.exports = FileWriter;