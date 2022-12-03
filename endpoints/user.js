const db = require('../mongo');
const { NotFound, Success, MethodNotAllowed } = require('../res/index');

module.exports = {
    name: 'user',
    method: "POST",
    description: "Get user profile for unauthenticated/authenticated user.",
    async execute(req, res, args, body){
        if(req.method !== this.method) return MethodNotAllowed(req, res);

        const { data: { user_id } } = body;
        const doc = await db.findUser({ id: `sc-${user_id}` });

        if(doc === null) return NotFound(req, res, { message: "User Not Found" });

        return Success(req, res, { 
            code: 200, 
            user: { 
                id: doc.id, 
                bio: doc.bio, 
                avatar: doc.avatar, 
                username: doc.username, 
                messages: doc.messages 
            } 
        });
    }
}