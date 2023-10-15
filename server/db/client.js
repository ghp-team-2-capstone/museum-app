// Require Client from pg
const { Client } = require("pg");

//Establishing connect to database (like how we do with http://)
const dbName = "museumdb";
const client = new Client(`postgres://localhost:5433/${dbName}`);

//Export for use in other files
module.exports = client;
