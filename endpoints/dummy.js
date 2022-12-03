const dummy = require('../dummy.json');

module.exports = {
    name: 'dummy',
    method: "GET",
    execute(req, res, args){
        res.type = 'application/json';
        res.status = 200;
        res.headers = {
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
        }
        res.body = dummy;
    }
}