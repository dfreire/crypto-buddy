import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

// credit: http://vancelucas.com/blog/stronger-encryption-and-decryption-in-node-js/
export function encrypt(key: string, text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(key), iv);
    let encrypted = cipher.update(text as any);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// credit: http://vancelucas.com/blog/stronger-encryption-and-decryption-in-node-js/
export function decrypt(key: string, text: string): string {
    const textParts = text.split(':');
    const iv = new Buffer(textParts.shift(), 'hex');
    const encryptedText = new Buffer(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

export function hashPass(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function sha1(text: string): string {
    return crypto.createHash('sha1').update(text).digest('hex');
}
