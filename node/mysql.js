const mysql=require("mysql");
const conDB=mysql.createConnection({
    host:'192.168.43.107:3306',
    user:'root',
    password:'a123456B+',
    database:'sakila'
});

conDB.connect();
conDB.query("select * from customer",
function(error,results,fields){
    if(error) throw error;
    console.log(results);
})
conDB.end();
// root, 123456
// 