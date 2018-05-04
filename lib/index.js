"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
function sha1(text) {
    return crypto.createHash('sha1').update(text).digest('hex');
}
exports.sha1 = sha1;
function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
}
exports.md5 = md5;
// credit: http://vancelucas.com/blog/stronger-encryption-and-decryption-in-node-js/
function encrypt(text, key) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}
exports.encrypt = encrypt;
// credit: http://vancelucas.com/blog/stronger-encryption-and-decryption-in-node-js/
function decrypt(text, key) {
    const textParts = text.split(':');
    const iv = new Buffer(textParts.shift(), 'hex');
    const encryptedText = new Buffer(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
exports.decrypt = decrypt;
function hashPass(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
exports.hashPass = hashPass;
function comparePass(password, hashPass) {
    return bcrypt.compareSync(password, hashPass);
}
exports.comparePass = comparePass;
function jwtSign(obj, key, expiresIn) {
    return jwt.sign(obj, key, { expiresIn });
}
exports.jwtSign = jwtSign;
function jwtVerify(token, key) {
    return jwt.verify(token, key);
}
exports.jwtVerify = jwtVerify;
