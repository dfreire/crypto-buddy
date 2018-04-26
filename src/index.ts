import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export function sha1(text: string): string {
    return crypto.createHash('sha1').update(text).digest('hex');
}

// credit: http://vancelucas.com/blog/stronger-encryption-and-decryption-in-node-js/
export function encrypt(text: string, key: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(key), iv);
    let encrypted = cipher.update(text as any);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// credit: http://vancelucas.com/blog/stronger-encryption-and-decryption-in-node-js/
export function decrypt(text: string, key: string): string {
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

export function comparePass(password: string, hashPass: string): string {
    return bcrypt.compareSync(password, hashPass);
}

export function jwtSign<T>(obj: T, key: string, expiresIn: string): string {
    return jwt.sign(obj, key, { expiresIn });
}

export function jwtVerify<T>(token: string, key: string): T {
    return jwt.verify(token, key) as T;
}
