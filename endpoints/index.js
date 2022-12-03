const { MethodNotAllowed, Success } = require('../res/index');

module.exports = {
    name: '/',
    method: "GET",
    description: "Main Endpoint for this API",
    execute(req, res){
        if(req.method !== this.method) return MethodNotAllowed(req, res);
        Success(req, res, { code: 200, message: "Welcome to OnlyMe API :D" });
    }
}