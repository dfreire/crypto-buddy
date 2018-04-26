export declare function sha1(text: string): string;
export declare function encrypt(text: string, key: string): string;
export declare function decrypt(text: string, key: string): string;
export declare function hashPass(password: string): string;
export declare function comparePass(password: string, hashPass: string): string;
export declare function jwtSign<T>(obj: T, key: string, expiresIn: string): string;
export declare function jwtVerify<T>(token: string, key: string): T;
