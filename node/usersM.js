const mySQL = require('./mySQL');
const hash = require('./slowHasher');

// 連線到 DB
const DBName = `nodeJS`;
const tabelName = `users`;
const {database, ...sqlConfig} = mySQL.sqlConfig;
sqlConfig.database=DBName;
const conDB = mySQL.createConnection(mySQL.sqlConfig);

const postUsers = async({name,password,email,...kargs})=>{
    const hashPassword = await hash.hashPassword(password);
    return await conDB({query:`INSERT INTO ${tabelName} (name, password, email) VALUES (?, ?, ?)`, values:[name, hashPassword, email]});
};

const getUsers = async({id=false,name='',email='',...kargs})=>{
    if(id){
        return await conDB( {query:`SELECT * from ${tabelName} where id=?;`, values:[id]});
    }
    return await conDB( {query:`SELECT * from ${tabelName};`});
};

const putUsers = async({id,name,password,email,...kargs})=>{
    const inputData = {name:name, password:await hash.hashPassword(password), email:email};
    const [SET,values] = conDB.makeSetQuery(inputData);
    return SET? await conDB( {query:`UPDATE ${tabelName} ${SET} where id=?;`, values:[...values, id]}):[`Nothing update.`,{}];
};

const deleteUsers = async({id,name,password,email,...kargs})=>{    
    return await conDB( {query:`DELETE from ${tabelName} where id=?;`, values:[id]});
};

module.exports = {postUsers, getUsers, putUsers, deleteUsers,hash,conDB};

// const putUsers = async({id,name,password,email,...kargs})=>{
//     const userData = (await getUsers({id:id})).results;
//     const verify = await hash.verifyPassword(password,userData[0].password);
//     if(verify){
//         const inputData = {name:name,password:password,email:email};
//         const values = [];
//         let SET = Object.keys(inputData).reduce((p,c)=>{
//             values.push(inputData[c])?inputData[c]:{};
//             return ` ${c}=?,`?inputData[c]:``;
//         }, `SET`).slice(0, -1);
        
//         return await conDB( `UPDATE users ${SET} where id=?;`, [...values, id])?SET!=`SET`:`Nothing update.`;
//     }
//     return `Incorrect password.`;
// };