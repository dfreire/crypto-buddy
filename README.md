# crypto-buddy

## Install and use

`npm install --save crypto-buddy`

```javascript
const cryptoBuddy = require('crypto-buddy');
```

## encrypt(key, message) and decrypt(key, message)

```javascript
const key = "qGMS2a!ORD-oC7yx.kWgyG3vKos0V?xs"; // must have a length of 32

let enc = cryptoBuddy.encrypt(key, 'hello');
console.log('enc', enc);
// => "6444f2e97d324c3d3f58588e34b3347d:e6a22cdc8ed701a78769dd8449f9304d"

// the same input produces a randomized output
let enc = cryptoBuddy.encrypt(key, 'hello');
console.log('enc', enc);
// => "032d12cece9a0ddc32e0f9168ff5ae43:37578f96f9b04a36a51de172517b41f4"

const dec = cryptoBuddy.decrypt(key, enc);
console.log('dec', dec);
// => 'hello'
```

Credit: http://vancelucas.com/blog/stronger-encryption-and-decryption-in-node-js/
