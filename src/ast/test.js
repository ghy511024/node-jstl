// var esprima = require('esprima');
// var program = 'a>b&&c==0';
var program = 'a.ghy.xixi';

// var ast = esprima.parse(program);

var ASTexcute = require("./ASTexcute");
var data = {
    a: {ghy: {xixi:3,haha:{k:6}}, cyl: 2},
    b: false,
    c: [1, 2, 3]
}
var ex = new ASTexcute(data);
ex.excute(program);
// console.log(JSON.stringify(ast))