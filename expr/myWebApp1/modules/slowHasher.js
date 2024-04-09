const bcrypt = require('bcryptjs');
const times = 10;
// 加密密碼
const hashPassword = async (password) => {
    return bcrypt.genSalt(times)
        .then((salt) => {
            return bcrypt.hash(password, salt);
        });
};

// 驗證密碼
const verifyPassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

module.exports = {hashPassword, verifyPassword};