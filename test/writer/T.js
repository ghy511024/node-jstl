/**
 * Created by ghy on 2017/12/1.
 */
const FileWriter = require ("../../src/writer/FileWriter");
const StringWriter = require ("../../src/writer/StringWriter");
const ServletWriter = require ("../../src/writer/ServletWriter");
const path = require ("path");
const T = {
    testWriter(){
        let fileWriter = new FileWriter (path.join (__dirname, "ghy.txt"));
        let s1 = new ServletWriter (fileWriter);
        s1.print ("第一行")
        s1.printil ("第3行")
        s1.println ("第2行")
    }
}
T.testWriter ();