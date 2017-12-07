/**
 * Created by ghy on 2017/11/17.
 */


const Node = require ("./node/Node-Api");
const JspReader = require ("./JspReader");
const Ut = require ("./Ut");
const Mark = require ("./Mark");
const Attributes = require ("./taglib/Attributes")
const TagInfo = require ("./taglib/TagInfo");

class Parser {
    constructor (reader) {
        this.reader = reader;
        this.start = reader.mark ();
    }

    /**
     * parse 函数入口 非常
     * @param path {String} 文件绝对路径
     * @param reader {JspReader} 字符读取处理类实例
     * @param parent {Node} 字符读取处理类实例
     * @return {Node.Nodes} page 对象，
     */
    static parse (path, reader, parent) {
        let parser = new Parser (reader);
        let root = new Node.Root (reader.mark (), parent);
        let i = 0;
        while (reader.hasMoreInput ()) {
            reader.showP ("外层解析" + i + "--begin")
            parser.parseElements (root);
            i++;
        }
        if (parent != null) {
            //todo add Include
        }
        let page = new Node.Nodes (root);
        return page;
    }

    parseElements (parent) {
        this.reader.showP ("Parser.parseElements")
        this.start = this.reader.mark ();
        if (this.reader.matches ("${")) {
            this.parseELExpression (parent, "${")
        }
        else if (this.reader.matches ("<jsp:")) {
            //todo 解析include 标签
        }
        else if (!this.parseCustomTag (parent)) {
            this.parseTemplateText (parent);
        }
    }


    parseTemplateText (parent) {

        if (!this.reader.hasMoreInput ()) {
            return;
        }
        let ttext = "";
        let ch = this.reader.nextChar ();
        if (ch == '\\') {
            this.reader.pushChar ();
        } else {
            ttext += ch;
        }
        while (this.reader.hasMoreInput ()) {
            ch = this.reader.nextChar ();
            if (ch == '<') {
                this.reader.pushChar ();
                break;
            } else if (ch == '$' || ch == '$') {
                if (!this.reader.hasMoreInput ()) {
                    ttext += ch;
                    break;
                }
                if (this.reader.nextChar () == '{') {
                    this.reader.pushChar ();
                    this.reader.pushChar ();
                    break;
                }
                ttext += ch;
                this.reader.pushChar ();
                continue;
            } else if (ch == '\\') {
                if (this.reader.hasMoreInput ()) {
                    ttext += ch;
                    break;
                }
                let next = this.reader.peekChar ();
                if (next == '%' || next == '$' || next == '#') {
                    ch = this.reader.nextChar ();
                }
            }
            ttext += ch;
        }
        console.log ("parseTemplateText:", ttext);
        new Node.TemplateText (ttext, this.start, parent);
    }

    parseCustomTag (parent) {
        this.reader.showP ("Parser.parseCustomTag")
        if (this.reader.peekChar () != '<') {
            return false;
        }
        this.reader.nextChar ();
        // let tagnName = "c:forEach"// 这儿tag 应该从一个方法中获取，暂时写死
        let tagName = this.reader.parseToken ();
        let i = tagName.indexOf (':');
        if (i == -1) {
            this.reader.reset (this.start);
            return false;
        }
        let prefix = tagName.substring (0, i);
        let shortTagName = tagName.substring (i + 1);

        let attrs = this.parseAttributes ();
        let uri = "";
        // console.log(attrs.data)
        this.reader.skipSpaces ();
        if (this.reader.matches ("/>")) {
            new Node.CustomTag (
                tagName,
                prefix,
                shortTagName,
                uri,
                attrs,
                this.start,
                parent);
            return true;
        }
        // 有内容
        let tagNode = new Node.CustomTag (
            tagName,
            prefix,
            shortTagName,
            uri,
            attrs,
            this.start,
            parent);
        this.parseOptionalBody (tagNode, tagName, "JSP")
        return true;
    }

    /**
     * ELExpressionBody
     *  (following "${" or "#{"to first unquoted "}")
     * @param
     * @return
     */
    parseELExpression (parent, typeEL) {
        this.start = this.reader.mark ();
        let singleQuoted = false;
        let doubleQuoted = false;
        let curl = 0;
        let ch;
        while (ch != '}' || curl >= 0 || singleQuoted || doubleQuoted) {
            ch = this.reader.nextChar ();
            if (ch == '\\' && (singleQuoted || doubleQuoted)) {
                this.reader.nextChar ();
                ch = this.reader.nextChar ();
            }
            if (ch == null) {
                console.error ("Parser.parseELExpression", typeEL)
            }
            if (ch == '"') {
                doubleQuoted = !doubleQuoted;
            } else if (ch == '\'') {
                singleQuoted = !singleQuoted;
            }
            else if (ch == '{') {
                curl++;
            } else if (ch == '}') {
                curl--;
            }
        }
        let text = typeEL + this.reader.getText (this.start, this.reader.mark ())
        new Node.ELExpression (text, this.start, parent);
    }

    parseOptionalBody (parent, tagName, bodyType) {
        this.reader.showP ("Parser.parseOptionalBody")
        if (this.reader.matches ("/>")) {
            // EmptyBody
            return;
        }
        if (!this.reader.matches (">")) {
            console.err ("未知得结束标签")
        }
        if (this.reader.matchesETag (tagName)) {
            // EmptyBody
            return;
        }

        if (!this.parseJspAttributeAndBody (parent, tagName, bodyType)) {
            // Must be ( '>' # Body ETag )
            this.parseBody (parent, tagName, bodyType);
        }
    }

    parseJspAttributeAndBody () {
        let result = false;
        //todo 这块可以去掉优化
        return result;
    }

    parseBody (parent, tag, bodyType) {
        this.reader.showP ("Parser.parseBody  " + tag + " " + bodyType + " " + (bodyType == TagInfo.BODY_CONTENT_JSP))
        if (bodyType == TagInfo.BODY_CONTENT_JSP) {
            while (this.reader.hasMoreInput ()) {
                if (this.reader.matchesETag (tag)) {
                    return;
                }
                this.parseElements (parent);
            }
        }
    }

    /**
     * @param attrs {Attributes}
     */
    parseAttributes () {
        let attribute = new Attributes ();
        this.reader.skipSpaces ();
        console.log ("开始解析attribute")
        while (this.parseAttribute (attribute)) {
            this.reader.skipSpaces ();
        }
        console.log ("结束解析attribute")
        return attribute;
    }

    parseAttribute (attrs) {
        let qName = this.parseName ();
        console.log ("qname:", qName)
        if (qName == null) {
            return false;
        }
        let localName = qName;
        let index = qName.indexOf (':');
        if (index != -1) {
            let prefix = qName.substring (0, index);
            localName = qName.substring (index + 1);
        }
        this.reader.skipSpaces ();
        if (!this.reader.matches ("=")) {
            console.error ("attribute.noequal")
        }
        this.reader.skipSpaces ();
        let quote = this.reader.nextChar ();
        if (quote != '\'' && quote != '"') {
            //todo 抛出异常
            console.error ("quote err")
        }
        let watchString = quote;// java jsp 中 还有 <%=%> 这种情况（此时 watchString=%>"），js 版本中不考虑了
        console.log ("quoto", quote)
        let attrValue = this.parseAttributeValue (watchString);
        console.log ("attrValue",  localName, qName, "CDATA", attrValue);
        attrs.addAttribute (localName, qName, "CDATA", attrValue)
        return true;
    }

    parseAttributeValue (watch) {
        let start = this.reader.mark ();
        let stop = this.reader.skipUntilIgnoreEsc (watch);
        if (stop == null) {
            //todo 抛出异常
            console.error ("stop err");
        }
        //todo 需要转义 parseQuoted （这一版先不做，不影响功能）
        // let ret = this.parseQuoted(this.reader.getText(start, stop));
        console.log ("位置：", start.getInfo (), stop.getInfo ())
        let ret = this.reader.getText (start, stop);

        return ret;
    }

    /**
     * Name ::= (Letter | '_' | ':') (Letter | Digit | '.' | '_' | '-' | ':')*
     * @param null
     * @return {String}
     */

    parseName () {
        let ch = this.reader.peekChar ();
        if (Ut.isLetter (ch) || ch == '_' || ch == ':') {
            let ret = ch;
            this.reader.nextChar ();
            ch = this.reader.peekChar ();
            while (Ut.isLetter (ch) || Ut.isDigit (ch) || ch == '.' || ch == '_' || ch == ':') {
                ret += ch;
                this.reader.nextChar ();
                ch = this.reader.peekChar ();
            }
            return ret;
        }
        return null;
    }
}

module.exports = Parser;