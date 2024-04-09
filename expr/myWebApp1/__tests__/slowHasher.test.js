const { hashPassword, verifyPassword } = require('../modules/slowHasher');

test('test password: password123', async () => {
    const password = 'password123';
    await hashPassword(password)
    .then(async hashedPassword => {
        console.log('Hashed Password:', hashedPassword);
        const isMatch = await verifyPassword(password, hashedPassword);
        console.log('Password Match:', isMatch);
    })
    .catch(error=>console.error(error));    
});
