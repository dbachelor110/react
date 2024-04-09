const mySQL = require('./mySQL');
const hash = require('./slowHasher');

// 連線到 DB
const DBName = `nodeJS`;
const tabelName = `users`;
const {database, ...sqlConfig} = mySQL.sqlConfig;
sqlConfig.database=DBName;
const conDB = mySQL.createConnection(mySQL.sqlConfig);

const getFirstNotUndefinedPair = (inputObject={})=>{
    for (const key in inputObject) {
        const value = inputObject[key];
        if(value){
            return [key,value];
        }
    }
    return [false,false];
};

const postUsers = async({name,password,email,...kargs})=>{
    const hashPassword = await hash.hashPassword(password);
    return await conDB({query:`INSERT INTO ${tabelName} (name, password, email) VALUES (?, ?, ?)`, values:[name, hashPassword, email]});
};

const getUsers = async({id=false,name=false,email=false,...kargs})=>{
    const inputData = {id,name,email,...kargs};
    const [key,value] = getFirstNotUndefinedPair(inputData);
    if(value){
        return await conDB( {query:`SELECT * from ${tabelName} where ${key}=?;`, values:[value]});
    }
    // if(id){
    //     return await conDB( {query:`SELECT * from ${tabelName} where id=?;`, values:[id]});
    // }else if(name){
    //     return await conDB( {query:`SELECT * from ${tabelName} where name=?;`, values:[name]});
    // }else if(email){
    //     return await conDB( {query:`SELECT * from ${tabelName} where email=?;`, values:[email]});
    // }
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

const getUserWithCheckPassword = async ({id=false,name=false,email=false,password,...kargs})=>{
    const inputData = {id,name,email,...kargs};
    const inputPassword = password;
    const dataPair = {};
    const outputResult = {exist:false,verify:false,data:false};
    const [key,value] = getFirstNotUndefinedPair(inputData);
    if (value){
        dataPair[key]=value;
        const result = await getUsers(dataPair);
        console.log(`result:`);
        console.log(result);
        // early return
        outputResult.exist = result[0].length == 1;
        if(outputResult.exist == false){return outputResult;}
        const {password,...userData} = result[0][0];
        console.log(`userData:`);
        console.log(userData);
        outputResult.verify = await hash.verifyPassword(inputPassword,password);
        outputResult.verify?outputResult.data=userData:{};
        return outputResult;
    }
    return outputResult;
}

module.exports = {postUsers, getUsers, putUsers, deleteUsers,getUserWithCheckPassword,hash,conDB};

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