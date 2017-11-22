class getElValue {
    constructor(data) {
        this.data = data || {};
    }

    getElValue(exp) {
        var exp_str;
        var reg = /\$\{(.*?)\}/gi
        exp.replace(reg, function (_, $1) {
            exp_str = $1;
        })
        let tmpData = this.data;
        let ret_value = null;
        console.log("elvalue:", $1);
        exp_str.split(".");
        for (let i = 0; i < exp_str.length; i++) {
            var c_key = exp_str[i];
            ret_value = tmpData[c_key] || {};
            tmpData = ret_value;
        }
        return ret_value;
    }
}
