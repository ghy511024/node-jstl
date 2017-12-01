const PAGE_SCOPE = 1;
const REQUEST_SCOPE = 2;
const SESSION_SCOPE = 3;
const APPLICATION_SCOPE = 4;

const PAGE = "node.jstl.jsPage";
const REQUEST = "node.jstl.jsRequest";
const SESSION = "node.jstl.jsSession";


class PageContext {
    constructor(data) {
        this.data;
        // page-scope 最高级别
        this.attributes = {};
        this.isNametableInitialized = false;
    }

    setAttribute(name, attribute) {
        if (attribute != null) {
            if (!this.isNametableInitialized) {
                this.initializePageScopeNameTable();
            }
            attributes[name] = attribute;
        } else {
            attributes[name] = null;
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

    getElValue(exp) {
        var exp_str;
        var reg = /\$\{(.*?)\}/gi
        exp.replace(reg, function (_, $1) {
            exp_str = $1;
        })
        let tmpData = this.data || {};
        let ret_value = null;
        console.log("elvalue:", exp_str);
        var exp_array = exp_str.split(".");
        console.log(exp_str)
        for (let i = 0; i < exp_array.length; i++) {
            var c_key = exp_array[i];
            ret_value = tmpData[c_key];

            if (ret_value == null) {
                break;
            }
            tmpData = ret_value;
        }
        console.log(ret_value);
        return ret_value;
    }
}

module.exports = PageContext;