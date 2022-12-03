const chalk = require('chalk');

function coloring(method){
    switch(method){
        case "GET":
            return chalk.magentaBright(method);
            break;
        
        case "POST":
            return chalk.greenBright(method);
            break;
    }
}

function log(method, endpoint){
    console.log(`${coloring(method)} ${endpoint}`);
}

module.exports = log;