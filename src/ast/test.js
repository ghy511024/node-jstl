// var esprima = require('esprima');
// var program = 'a>b&&c==0';
var program = '2*a.cyl+"vv"';

// var ast = esprima.parse(program);

var ASTexcute = require ("./AstCompiler");

var data = {
    a: { ghy: { xixi: 3, haha: { k: 6 } }, cyl: 2 },
    b: false,
    c: [1, 2, 3]
}

var ex = new ASTexcute (data);
ex.excute (program);
// console.log(JSON.stringify(ast))