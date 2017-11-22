class getElValue {
    constructor() {

    }

    getElValue(exp) {
        var exp_str;
        var reg = /\$\{(.*?)\}/gi
        exp.replace(reg, function (_, $1) {
            exp_str = $1;
        })
        console.log("elvalue:", $1);
        exp_str.split(".");
        for (let i = 0; i < exp_str.length; i++) {
            var c_key = exp_str[i];

        }
    }
}