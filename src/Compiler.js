/**
 * Created by ghy on 2017/11/17.
 */
class Compiler {
    compile () {
        this.generateJS ();
    }

    generateJS () {
        let t1 = t2 = t3 = t4 = 0;
        this.doParser ("xixi", null);

    }

    doParser (path, parent) {
        let reader = new JspReader ("文件名");
        Parser.parse (path, reader, parent)
    }
}