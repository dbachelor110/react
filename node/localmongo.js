const { MongoClient }=require("mongodb");
const url="mongodb://localhost:27017/";


const client = new MongoClient(url);
// const result = (async()=>await client.connect())();
// console.log(result);
// client.close();

const main = async()=>{
    try {
        // Use connect method to connect to the Server
        await client.connect();
        console.log("Connected successfully to server");

        const db = client.db('TestMongoDB');

        // Perform further operations on the database here

    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}    
main();

// MongoClient.connect(url,function(err, db) {
//     if (err) {console.log(err);}
//     console.log(`db connect done.`);
//     db.cloces();
//   });
// JavaScript Document

// var MongoClient=require("mongodb").MongoClient;
// var url="mongodb://127.0.0.1:27017/TestMongoDB2";
// // Create a new MongoClient
// const client = new MongoClient(url);

// async function main() {
// 	try {
// 		// Use connect method to connect to the Server
// 		await client.connect();
// 		console.log("Connected successfully to server");

// 		const db = client.db('TestMongoDB2');

// 		// Perform further operations on the database here

// 	} catch (err) {
// 		console.log(err);
// 	} finally {
// 		await client.close();
// 	}
// }    
// main();    
