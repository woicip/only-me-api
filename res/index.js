const index = {
    Success(req, res, data){
        const boydData = JSON.stringify(data);
        res.status = data.code;
        res.type = 'application/json';
        res.headers = {
            'access-control-allow-origin': '*'
        }
        res.body = boydData;
    },
    BadRequest(req, res, data){
        const bodyData = JSON.stringify({ code: 401, message: "BAD REQUEST" });
        res.status = 400;
        res.type = 'application/json';
        res.headers = {
            'access-control-allow-origin': '*'
        }
        res.body = bodyData;
    },
    Unauthorized(req, res, data){
        const bodyData = JSON.stringify({ code: 401, message: "UNAUTHORIZED" });
        res.status = 401;
        res.type = 'application/json';
        res.headers = {
            'access-control-allow-origin': '*'
        }
        res.body = bodyData;
    },
    NotFound(req, res, data){
        const bodyData = JSON.stringify({ code: 404, ...data });
        res.status = 404;
        res.type = 'application/json';
        res.headers = {
            'access-control-allow-origin': '*'
        }
        res.body = bodyData;
    },
    MethodNotAllowed(req, res){
        res.status = 405;
        res.type = 'application/json';
        res.headers = {
            'access-control-allow-origin': '*'
        }
        res.body = JSON.stringify({ code: 405, message: "METHOD NOT ALLOWED" });
    },
    Conflict(req, res, message){
        const bodyData = JSON.stringify({ code: 409, ...message });
        res.status = 409;
        res.type = 'application/json';
        res.headers = {
            'access-control-allow-origin': '*'
        }
        res.body = bodyData;
    },
    InternalServerError(req, res){
        res.status = 500;
        res.type = 'application/json';
        res.headers = {
            'access-control-allow-origin': '*'
        }
        res.body = JSON.stringify({ code: 500, message: "INTERNAL SERVER ERROR" });
    }
}

module.exports = index;