# crypto-buddy

## Install and use

`npm install --save crypto-buddy`

```javascript
const cryptoBuddy = require('crypto-buddy');
```


## sha1(text)

```javascript
cryptoBuddy.sha1('Hello, World!');
// => '0a0a9f2a6772942557ab5355d76af442f8f65e01'
```


## encrypt(key, message) and decrypt(key, message)

```javascript
const key = 'qGMS2a!ORD-oC7yx.kWgyG3vKos0V?xs'; // must have a length of 32

cryptoBuddy.encrypt('hello', key);
// => '6444f2e97d324c3d3f58588e34b3347d:e6a22cdc8ed701a78769dd8449f9304d'

// the same input produces a randomized output
cryptoBuddy.encrypt('hello', key);
// => '032d12cece9a0ddc32e0f9168ff5ae43:37578f96f9b04a36a51de172517b41f4'

cryptoBuddy.decrypt('6444f2e97d324c3d3f58588e34b3347d:e6a22cdc8ed701a78769dd8449f9304d', key);
// => 'hello'
```

Credit: http://vancelucas.com/blog/stronger-encryption-and-decryption-in-node-js/


## hashPass(password)

```javascript
cryptoBuddy.hashPass('my_password');
// => '$2b$10$nNsKJvCcBNxBCu.UL9NRE.sxPLVYTmz4rlqIhRhQLT6aIbQnkLGVK'

// again, the same input produces a different output
cryptoBuddy.hashPass('my_password');
// => '$2b$10$cJ2S6QKhewzlr4Itx4qXdOsaGg4H86tynDzlAi5Zue9RV4vjIzb3S'
```

## comparePass(password, hashPass)

```javascript
cryptoBuddy.comparePass('my_password', '$2b$10$nNsKJvCcBNxBCu.UL9NRE.sxPLVYTmz4rlqIhRhQLT6aIbQnkLGVK');
// => true

cryptoBuddy.comparePass('not_my_password', '$2b$10$nNsKJvCcBNxBCu.UL9NRE.sxPLVYTmz4rlqIhRhQLT6aIbQnkLGVK');
// => false
```

## jwtSign(obj, key, expiresIn) and jwtVerify(token, key)

```javascript
const key = 'qGMS2a!ORD-oC7yx.kWgyG3vKos0V?xs';

cryptoBuddy.jwtSign({ hello: 'world' }, key, '1h');
// => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWxsbyI6IndvcmxkIiwiaWF0IjoxNTI0NzczMDM5LCJleHAiOjE1MjQ3NzY2Mzl9.hqRA1Ws2BJ6c_IiUzeS6t1ECBb6CzngcYefmIcxRSL8'

jwtVerify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWxsbyI6IndvcmxkIiwiaWF0IjoxNTI0NzczMDM5LCJleHAiOjE1MjQ3NzY2Mzl9.hqRA1Ws2BJ6c_IiUzeS6t1ECBb6CzngcYefmIcxRSL8', key)
// => { hello: 'world', iat: 1524773039, exp: 1524776639 }
```
