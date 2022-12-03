const { updateUserComment } = require('../mongo');
const { InternalServerError,  MethodNotAllowed, Success, BadRequest, Unauthorized } = require('../res/index');

module.exports = {
    name: 'userSendComment',
    method: "POST",
    description: "Endpoint for unauthenticated user to have ability to post comment on user's message",
    async execute(req, res, args, body){
        if(req.method !== this.method) return MethodNotAllowed(req, res);

        const { data: { user_id, message_id, comment } } = body;

        const updated = await updateUserComment({ user_id, message_id, comment });

        if(updated){
            return Success(req, res, { code: 200, message: "Comment Has Been Updated" });
        } else {
            return InternalServerError(req, res);
        }

    }
}