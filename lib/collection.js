const mongoClient = require("./mongoConfig");
const db = mongoClient.db("cash-io");
const usersCollections = db.collection("users");

module.exports = { usersCollections };
