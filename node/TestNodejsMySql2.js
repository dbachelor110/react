// JavaScript Document

var mysql = require("mysql2");//需先安裝npm install mysql2支援sha2密碼
// 建立資料庫連線池
var pool = mysql.createPool({
    host: "54.169.129.23",
    user: "root",
    password: "a123456B+",
    database: "nodeJS",
    //port: '資料庫port'//mysql預設3306
    // 無可用連線時是否等待pool連線釋放(預設為true)
    waitForConnections: true,
    // 連線池可建立的總連線數上限(預設最多為10個連線數)
    connectionLimit: 10
});


// 取得連線池的連線
pool.getConnection(function (err, connection) {
    try {
        try{
            if (err) {
                // 取得可用連線出錯
    
            }
            else {
                // 成功取得可用連線
                // 使用取得的連線
                const a = connection.query('select * from customer', function (error, results) {
                    // 使用連線查詢完資料
                    // if (error) throw error;
                    // console.log(results[0]);
                    return error;
                });
                console.log(a);
            }
        }
        finally {
            console.log(`release`);
            connection.release();
        }
    }catch(error){
        console.log(`catch`);
    }

});

// 取得連線池的連線
// pool.getConnection(function (err, connection) {
//     try {
//         if (err) {
//             // 取得可用連線出錯
//         }
//         else {
//             // 成功取得可用連線
//             // 使用取得的連線
//             connection.query('select * from customer', function (error, results) {
//                 // 使用連線查詢完資料
//                 // if (error) throw error;
//                 console.log(results[0]);
//             });
//         }
//     } catch (big) {
//         connection.release();
//         console.log(`do something.`);
//     }
//     finally {
//         try {
//             connection.release();
//         } catch (error) {
//             console.log(`do nothing.`);
//         }
//     }
// });


/*
LINUX 虛擬機 帳號 有兩個 root,yeh
             密碼:123456
    mysql DB 帳號 :root
             密碼:a123456B+
node.js的mysql模組還未支援新版mysql 8.0 的 sha2_password,故必須改成舊型密碼認證
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
的'root'@'localhost'限定root帳號只能localhost上線
  'root'@'%'則root帳號不限主機
指令如下:

sudo mysql -u root -p
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'a123456B+';
flush privileges;
*/
