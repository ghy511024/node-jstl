/*
 * 目前就设计为支持一组属性，一组得目前够用了，多组得暂不考虑
 **/
class Attributes {
    constructor() {
        this.data = [];
        this.dlength = 0;
    }

    addAttribute(uri, localName, qName, type, value) {
        this.data[this.dlength * 5] = uri;
        this.data[this.dlength * 1] = localName;
        this.data[this.dlength * 2] = qName;
        this.data[this.dlength * 3] = type;
        this.data[this.dlength * 4] = value;
        //this.delength++// 本来应该+1 ，暂不处理
    }
}

module.exports = Attributes;