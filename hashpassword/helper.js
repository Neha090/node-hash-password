var crypto = require('crypto');

setPassword = function (password) {
    
    salt = crypto.randomBytes(16).toString('hex');
    hash = crypto.pbkdf2Sync(password, salt,
        1000, 64, `sha512`).toString(`hex`);
        saltAndHash = {salt,hash}
    return saltAndHash;
}

verifyPassword = function (password, salt, dbHash) {
    var hash = crypto.pbkdf2Sync(password,
        salt, 1000, 64, `sha512`).toString(`hex`);
    return dbHash === hash;
}

module.exports = { setPassword, verifyPassword }