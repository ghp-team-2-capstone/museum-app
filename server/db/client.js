// Require Client from pg
const { Client } = require("pg");

//Establishing connect to database (like how we do with http://)
const dbName = "museumdb";
// const client = new Client(`postgres://localhost:5433/${dbName}`);
const client = new Client('postgres://museumdb_pvkq_user:dKSGfjRDWxsY8y2pmoxsx1cji7GREdJm@dpg-ckiqh5kl4vmc73cejr00-a/museumdb_pvkq')
//Export for use in other files
module.exports = client;
