const crypto=require('crypto');

const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+-={}[]|:;"\'<>,.?/`;

// 產生特殊字符 salt
const makeSalt = (length=8)=>{
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}



// 生成 salt
const generateSalt = () => {
    return crypto.randomBytes(32).toString('hex');
};

// 使用 salt 和密碼進行加密
const hashPassword = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
};

// 生成 salt
const salt = makeSalt();

// 使用 salt 和密碼進行加密
const password = 'password';
const hashedPassword = hashPassword(password, salt);

console.log('Salt:', salt);
console.log('Salt.len:', salt.length);
console.log('Hashed Password:', hashedPassword);
console.log('Hashed Password.len:', hashedPassword.length);
exports