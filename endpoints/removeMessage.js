const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../api.config.json');
const { removeUserMessage } = require('../mongo');
const { InternalServerError, MethodNotAllowed, Unauthorized, Success, BadRequest } = require('../res/index');
const parseToken = require('../functions/parseToken');

module.exports = {
    name: 'removeMessage',
    method: "POST",
    description: "Remove a Message for Authenticated User",
    async execute(req, res, args, body){
        if(req.method !== this.method) return MethodNotAllowed(req, res);
        if(req.headers.authorization === undefined) return BadRequest(req, res);

        const { data: { message_id } } = body;
        const token = parseToken(req.headers.authorization);

        try {
            const decoded = jwt.verify(token, JWT_KEY);
            const removed = await removeUserMessage({ user_id: decoded.id, message_id });

            if(removed){
                return Success(req, res, { code: 200, message: "Message Has Been Deleted" });
                
            } else {
                return InternalServerError(req, res);
            }

        } catch(err){
            console.log(err);
            Unauthorized(req, res);
        }
    }
}