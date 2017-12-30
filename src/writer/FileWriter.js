/**
 * Created by ghy on 2017/12/1.
 */

const fs = require ("fs");
const Writer = require ("./Writer");
class FileWriter extends Writer {
    constructor (outFilePath) {
        super ();

        // if(fs.existsSync(outFilePath)){
        //     fs.mkdirSync()
        // }
        this.filePath = outFilePath;
        fs.writeFileSync (this.filePath, "");
    }

    _write_str (s) {
        fs.appendFileSync (this.filePath, s);
    }

}
module.exports = FileWriter;