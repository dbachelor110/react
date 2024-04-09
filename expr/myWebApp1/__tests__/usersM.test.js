const userM = require('../modules/usersM');

const newUser = {
    name:`user${new Date().getTime()}`,
    password:`pasw`,
    email:`${new Date().getTime()}@mail.com`
}
const updateUser = {
    name:`user2`,
    password:`o*&&iii`,
    email:`mail@mail.com${new Date().getTime()}`
}


test('postUser', async () => {
    const [results,fields] = await userM.postUsers(newUser);
    console.log(results);
    updateUser.id = results.insertId;
});

test('getAllUsers', async () => {
    const [results,fields] = await userM.getUsers({});
    console.log('getAllUsers');
    console.log(results);
});

test('getUsersByID', async () => {
    const [results,fields] = await userM.getUsers(updateUser);
    console.log('getUsersByID');
    console.log(results);
});

test('putUsers', async () => {
    const [results,fields] = await userM.putUsers(updateUser);
    console.log(results);
    const [update,...rest] = await userM.getUsers(updateUser);
    console.log(update[0],updateUser);
});

test('deleteUser', async () => {
    const [results,fields] = await userM.deleteUsers(updateUser);
    console.log(results);
});