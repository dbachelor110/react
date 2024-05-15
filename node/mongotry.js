const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017/";

// const client = new MongoClient(uri);
const client2 = new MongoClient(`${uri}test`);
async function run() {
  const client = new MongoClient(uri);
  try {


    const database = client.db('test');

    // const created = await database.createCollection('created');
    const users = database.collection('users');

    // Query for a movie that has the title 'Back to the Future'
    const query = { age: { $gt: 23 } };
    const user = await users.findOne(query);

    console.log(user);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function run2() {
  const client2 = new MongoClient(`${uri}test`);
  try {

    const database = client2.db();
    console.log(`databaseName: ${database.databaseName}`);
    const created = await database.createCollection('created');
    console.log(`databaseName: ${database.databaseName}`);
  } finally {
    // Ensures that the client will close when you finish/error
    await client2.close();
  }
}

async function insertOne(inputData) {
  const client = new MongoClient(uri);
  try {

    const database = client.db('test');

    // const created = await database.createCollection('created');
    const users = database.collection('users');

    const insertOne = await users.insertOne(inputData);

    console.log(insertOne);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function insertMany(inputData) {
  const client = new MongoClient(uri);
  try {


    const database = client.db('test');

    // const created = await database.createCollection('created');
    const users = database.collection('users');

    const insertOne = await users.insertMany(inputData);

    console.log(insertOne);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function find(inputData) {
  const client = new MongoClient(uri);
  try {

    const database = client.db('test');

    // const created = await database.createCollection('created');
    const users = database.collection('users');

    const find = await users.find(inputData).toArray();

    console.log(find);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function updateMany(filter,update) {
  const client = new MongoClient(uri);
  try {

    const database = client.db('test');

    // const created = await database.createCollection('created');
    const users = database.collection('users');

    const updateMany = await users.updateMany(filter,update);
    // (inputData).toArray();

    console.log(updateMany);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


const oneData = {
  item: `canvas`,
  qty: 200,
  tags:['cotton'],
  size: {h:28,w:35.5,uom:`cm`}
};
// insertOne(oneData).catch(console.dir);
updateMany({item: `canvas`},{$set:{qty:250}}).catch(console.dir);
// run2().catch(console.dir);