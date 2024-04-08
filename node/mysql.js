const mysql = require("mysql2/promise");

const Pool = (config) => mysql.createPool({
    ...config
});

const sqlConfigNoDBName = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'a123456B+'
};

const makeSetQuery = (inputData)=>{
    const keys = Object.keys(inputData);
    const values = [];
    const SET = keys.reduce((p,c)=>{
        if(! inputData[c]) return p;
        values.push(inputData[c]);
        return p+` ${c}=?,`;
    }, `SET`).slice(0, -1);
    return SET!=`SET`?[SET,values]:[false,values];
}

const sqlConfig = { ...sqlConfigNoDBName, database: `nodeJS` };

function startTimer(pool, millis) {
    const setEndTimeout = ()=>{
        return setTimeout(() => {
            console.log('No connection activity detected. Closing pool...');
            pool.end((err)=>{
                err? console.error('Error closing pool:', err.message): console.log('Pool closed successfully.');
            });
        }, millis);
    }
    let timer = setEndTimeout();
    const resetTimer = ()=>{
        clearTimeout(timer);
        timer = setEndTimeout();
    }
    const Timer = ()=>{};
    Timer.get =   ()=>timer;
    Timer.reset = ()=>resetTimer();
    return Timer;
}

const createConnection = ({
    host = 'localhost',
    port = '3306',
    user = 'root',
    database = 'nodeJS',
    waitForConnections = true,
    connectionLimit = 0,
    maxIdle = 0, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout = 5000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit = 0,
    enableKeepAlive = true,
    keepAliveInitialDelay = 0,
    ...rest
}) => {
    const config = { host, port, user, database, waitForConnections, connectionLimit, maxIdle, idleTimeout, queueLimit, enableKeepAlive, keepAliveInitialDelay, ...rest };
    // console.log(config);
    const pool = Pool(config);
    const outputFunction = async ({ query='', values = [], errorHandler = error => { console.log(error); } }) => {
        return await pool.query(query, values)
        .then((results=>{return results;}))
        .catch(error => errorHandler(error));
    };
    outputFunction.pool=pool;
    outputFunction.makeSetQuery=makeSetQuery;

    // 設定 timeOut
    let timer = startTimer(pool,config.idleTimeout);

    // 監聽連接池事件
    pool.on('connection', ()=>{
        console.log('Connection established.');
        // 如果有新的連接，重新啟動計時器
        clearTimeout(timer.get());
        timer.reset();
    });

    // 監聽連接池空閒事件
    pool.on('release', ()=>{
        console.log('Connection released.');
        // 如果連接被釋放，重新啟動計時器
        clearTimeout(timer.get());
        timer.reset();
    });
    return outputFunction;
};

module.exports = { createConnection, sqlConfig };
// root, 123456
// sudo mysql -u root -p
// ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
// flush privileges;
// const conDB = createConnection({...sqlConfig});
// ( async()=>{
//     const OUTPUT = await conDB({query:`select user, plugin from mysql.user`});
//     console.log(OUTPUT);
//     conDB.pool.end();
// } )();