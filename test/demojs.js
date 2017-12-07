const PageContext = require("./tag/PageContext");
const ForEachIpml = require("./tag/ForEachIpml");

class demojs {
    constructor() {
        this.ret = "";
    }
    outjs(data) {
        let _jspx_page_context = new PageContext(data);
        try {
            if (this._js_fun_c_forEach_0(_js_page_context)) {
                return this.ret;
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    _js_fun_c_forEach_0(_js_page_context) {
        let js_th_c_forEach = new forEachIpml();
        // 设置变量
        let items = _js_page_context.getElValue("${list1}");
        console.log(items);
        js_th_c_forEach.context = _js_page_context;
        js_th_c_forEach.parent = null;
        js_th_c_forEach.setItems(items);
        js_th_c_forEach.setVar("item");
        try {
            let _js_eval_c_forEach_0 = js_th_c_forEach.doStartTag();
            if (_js_eval_c_forEach_0 != 0) {
                do {
                    this.ret += "nnn";
                    let evalDoAfterBody = js_th_c_forEach.doAfterBody();
                }
                while (true)
            }
        }
        catch (e) {
        }
        return false;
        //=== end 部分开始结束
    }
}

let d = new demojs();