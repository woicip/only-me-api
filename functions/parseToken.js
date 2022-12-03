module.exports = function parseToken(rawToken){
    const token = rawToken.split(' '); token.shift();
    return token.join();
}