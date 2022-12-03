const db = require('../mongo');
const { Conflict, Success, BadRequest, Unauthorized, InternalServerError, MethodNotAllowed } = require('../res/index');
const parseToken = require('../functions/parseToken');

module.exports = {
    name: 'register',
    method: "POST",
    description: "Endpoint for registering new account",
    async execute(req, res, args, body){
        if(req.method !== this.method) return MethodNotAllowed(req, res);

        const { data } = body;

        // Cari apakah ada akun yang sama dengan yang ingin di daftarkan
        const findUser = await db.findUser({ username: data.username });
            
        if(findUser === null){
            const doc = await db.createUser(data); 
            
            if(doc !== null){
                return Success(req, res, { code: 200, message: "Success Register Account" });

            } else {
                return InternalServerError(req, res);
            }

        } else {
            return Conflict(req, res, { message: "The username is already exist" });
        }

    }
}