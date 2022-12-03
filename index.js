const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const fs = require('fs');
const log = require('./log');

app.use(cors());
app.use(bodyParser());

require('./mongo.js');
require('dotenv').config();

const collections = [];
const files = fs.readdirSync('./endpoints');
for(const file of files){
    const call = require(`./endpoints/${file}`);
    collections.push({ ...call });
}

app.use(async ctx => {
    const req = ctx.request;
    const res = ctx.response;
    const body = ctx.request.body;
    
    log(req.method, req.url);

    try {
        const split = req.url.split('/').filter(enp => enp.length > 0);
        const endpoint = split[0] === undefined ? req.url : split.shift();

        const command = collections.filter(command => command.name === endpoint)[0];
        await command.execute(req, res, split, body);

    } catch(err){
        console.log(`❌ ${req.url} Error while processing it`);
    }
})

app.listen(process.env.PORT, () => console.log(`Server started at http://localhost:${process.env.PORT}`));