const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../api.config.json');
const { findUser } = require('../mongo');
const { Success, NotFound, MethodNotAllowed } = require('../res/index');
const parseToken = require('../functions/parseToken');

module.exports = {
    name: 'getMessages',
    method: "GET",
    description: "Endpoint for authenticated user to get the message collection",
    forAuthenticatedUser: true,
    async execute(req, res, args, body){
        if(req.method !== this.method) return MethodNotAllowed(req, res);

        const token = parseToken(req.headers.authorization);

        try {
            const decoded = jwt.verify(token, JWT_KEY);
            const doc = await findUser({ id: decoded.id });
            Success(req, res, { code: 200, messages: doc.messages });

        } catch(err){
            NotFound(req, res, { message: "Messages Not Found" });
        }
    }
}