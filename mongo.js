const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { Base64 } = require('js-base64');
const { password } = require('./mongo.config.json');
const createID = require('./functions/createID');
mongoose.connect(`mongodb+srv://dbUser:${password}@koken-cluster.epwup.mongodb.net/onlyme?retryWrites=true&w=majority`);

mongoose.connection.on('error', err => console.log(err));
mongoose.connection.on('connecting', () => console.log('MongoDB Atlas Connecting ...'));
mongoose.connection.on('connected', () => console.log('✅ MongoDB Atlas Connected.'));
mongoose.connection.on('disconnected', () => console.log('🟥 MongoDB Atlas Disconnected.'));

const Users_Schema = new mongoose.Schema({
    id: String,
    bio: String,
    avatar: String,
    username: String,
    password: String,
    messages: Array
});

const Users = new mongoose.model('Users', Users_Schema);

const db = {
    async createUser({ username, password }){
        return await Users.create({
            id: `sc-${createID()}`,
            bio: null,
            avatar: null,
            username: username,
            password: Base64.encode(password),
            messages: []
        });
    },
    async findUser(data){
        return await Users.findOne(data);
    },
    async updateUserMessages({ user_id, message }){
        const doc = await Users.findOne({ id: `sc-${user_id}` });
        const newMessages = [ message, ...doc.messages ];

        const update = await Users.updateOne({ id: `sc-${user_id}` }, { messages: newMessages });

        if(update.acknowledged){
            return true;

        } else {
            return false;
        }
        
    },
    async updateUserComment({ user_id, message_id, comment }){
        const doc = await Users.findOne({ id: `sc-${user_id}` });
        const messages = doc.messages;
        const comments = messages.filter(msg => msg.id === message_id)[0].comments;
        comments.unshift(comment);

        const update = await Users.updateOne({ id: `sc-${user_id}` }, { messages });

        if(update.acknowledged){
            return true;

        } else {
            return false;
        }
    },
    async removeUserMessage({ user_id, message_id }){
        const user = await Users.findOne({ id: user_id });
        const newMessages = user.messages.filter(msg => msg.id !== message_id);

        const updated = await Users.updateOne({ id: user_id }, { messages: newMessages });

        if(updated.acknowledged){
            return true;

        } else {
            return false;
        }

    }
}

module.exports = db;
