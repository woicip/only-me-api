module.exports = function createState(pref = null){
    let data = pref;
    function change(arg){
        data = arg;
    }

    return [ data, change ];
}