/**
 * Created by ghy on 2017/11/17.
 */
var Ut = {
    arrayContain: function (array, item) {
        var ret = false;
        for (var i = 0; i < array.length; i++) {
            if (array[i] === item) {
                ret = true;
                break;
            }
        }
        return ret;
    }
}
module.exports = Ut;