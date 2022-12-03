const { updateUserMessages } = require('../mongo');
const { BadRequest, InternalServerError, MethodNotAllowed, Success, Unauthorized } = require('../res/index');

module.exports = {
    name: 'userSendMessage',
    method: "POST",
    description: "Endpoint for unauthenticated user to have ability to send message to user's profile",
    async execute(req, res, args, body){
        if(req.method !== this.method) return MethodNotAllowed(req, res);

        const { data: { user_id, message } } = body;

        const updated = await updateUserMessages({ user_id, message });
    
        if(updated){
            Success(req, res, { code: 200, message: "Message Has Been Updated" });
            
        } else {
            InternalServerError(req, res);
        }

    }
}