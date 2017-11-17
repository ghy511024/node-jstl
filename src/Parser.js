/**
 * Created by ghy on 2017/11/17.
 */
class Parser {
   static parse (path, reader, parent) {
       let parser = new Parser(reader);

       let root = new Node.Root(reader.mark(), parent);
    }
}