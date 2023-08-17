const mongoClient = require('./mongoConfig');
const db = mongoClient.db('cash-io');

// all collections
const usersCollection = db.collection('users');
const transactionCollection = db.collection('transactions');
const categoryCollection = db.collection('categories');

module.exports = {
  usersCollection,
  transactionCollection,
  categoryCollection,
};
