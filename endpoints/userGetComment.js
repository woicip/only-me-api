const { findUser, updateUserComment } = require('../mongo');
const { BadRequest, InternalServerError,  MethodNotAllowed, Success, Unauthorized } = require('../res/index');

module.exports = {
    name: 'userGetComment',
    method: "POST",
    description: "Endpoint to get user's comments",
    async execute(req, res, args, body){
        if(req.method !== this.method) return MethodNotAllowed(req, res);
        
        const { data: { user_id, message_id } } = body;

        const user = await findUser({ id: `sc-${user_id}` });
        const messages = user.messages;
        const comments = messages.filter(msg => msg.id === message_id)[0].comments;
        Success(req, res, { code: 200, comments });

    }
}