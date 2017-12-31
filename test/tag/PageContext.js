const PAGE_SCOPE = 1;
const REQUEST_SCOPE = 2;
const SESSION_SCOPE = 3;
const APPLICATION_SCOPE = 4;

const PAGE = "node.jstl.jsPage";
const REQUEST = "node.jstl.jsRequest";
const SESSION = "node.jstl.jsSession";


class PageContext {
    constructor(data) {
        this.data=data;
        this.attributes = {};
        this.isNametableInitialized = false;
    }

    setAttribute(name, attribute) {
        if (attribute != null) {
            if (!this.isNametableInitialized) {
                this.initializePageScopeNameTable();
            }
            this.attributes[name] = attribute;
        } else {
            this.attributes[name] = null;
        }

    }

    getAttribute(name) {
        if (!this.isNametableInitialized) {
            this.initializePageScopeNameTable();
        }
        return this.attributes[name];
    }

    initializePageScopeNameTable() {
        // 留着以后扩展吧，暂时用不到
        this.isNametableInitialized = true;
        this.setAttribute(PAGE, {})
        this.setAttribute(REQUEST, {})
        this.setAttribute(SESSION, {})
    }

    /**
     * 本该词法解析，先做 简单点，支持 a.b.c 这种单个表达式解析，不支持运算表达式
     * */
    getElValue(exp) {
        var exp_str;
        var reg = /\$\{(.*?)\}/gi
        exp.replace(reg, function (_, $1) {
            exp_str = $1;
        })
        // let tmpData = this.data || {};
        let tmpData=Object.assign({},this.attributes,this.data)

        let ret_value = null;
        var exp_array = exp_str.split(".");
        for (let i = 0; i < exp_array.length; i++) {
            var c_key = exp_array[i];
            ret_value = tmpData[c_key];
            if (ret_value == null) {
                break;
            }
            tmpData = ret_value;
        }
        console.log("this.attributes",this.attributes,exp_array,ret_value)
        return ret_value;
    }
}

module.exports = PageContext;