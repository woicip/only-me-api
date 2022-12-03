const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../api.config.json');
const db = require('../mongo');
const { BadRequest, Success, NotFound, MethodNotAllowed } = require('../res/index');
const { Base64 } = require('js-base64');

module.exports = {
    name: 'login',
    method: "POST",
    description: "Endpoint for user to login",
    async execute(req, res, args, body){
        if(req.method !== this.method) return MethodNotAllowed(req, res);
        
        const { data } = body;
        const bodySize = Object.keys(body);
        if(!bodySize.length) return BadRequest(req, res);

        const doc = await db.findUser({ username: data.username, password: Base64.encode(data.password) });
        if(doc === null) return NotFound(req, res, { message: "User Not Found" });

        const token = jwt.sign({ id: doc.id, bio: doc.bio, avatar: doc.avatar, username: doc.username }, JWT_KEY, { expiresIn: '30m' });
        Success(req, res, { code: 200, message: "Welcome to OnlyMe!", token });

    }
}