class B {

}

module.modulemap
module.exports = function () {
    let a = require("./A");
    console.log(a.haha());
};