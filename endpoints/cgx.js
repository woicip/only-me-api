const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../api.config.json');
const { Success, BadRequest, MethodNotAllowed, Unauthorized } = require('../res/index');
const parseToken = require('../functions/parseToken');

module.exports = {
    name: 'cgx',
    method: "GET",
    description: "check user token whether the token is still valid or not",
    forAuthenticatedUser: false,
    execute(req, res, args, body){
        if(req.method !== this.method) return MethodNotAllowed(req, res);
        if(req.headers.authorization === undefined) return BadRequest(req, res);
        
        const token = parseToken(req.headers.authorization);

        try {
            const decoded = jwt.verify(token, JWT_KEY);
            Success(req, res, { code: 200 });

        } catch(err){
            Unauthorized(req, res);
        }
    }
}