const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../api.config.json');
const { v4: uuidv4 } = require('uuid');
const { InternalServerError, MethodNotAllowed, Success } = require('../res/index');

module.exports = {
    name: "guest",
    method: "GET",
    description: null,
    execute(req, res, args, body){
        if(req.method !== this.method) return MethodNotAllowed(req, res);

        try {
            const structure = { guest_id: uuidv4() };
            const token = jwt.sign(structure, JWT_KEY, { expiresIn: '30m' });
            Success(req, res, { code: 200, token });

        } catch(err){
            InternalServerError(req, res);
        }
    }
}