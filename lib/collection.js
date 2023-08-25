const mongoClient = require('./mongoConfig');
const db = mongoClient.db('cash-io');

// all collections
const usersCollection = db.collection('users');
const transactionsCollection = db.collection('transactions');
const categoriesCollection = db.collection('categories');
const walletsCollection = db.collection('wallets');
const transferHistoriesCollection = db.collection('transferHistories');

module.exports = {
  usersCollection,
  transactionsCollection,
  categoriesCollection,
  walletsCollection,
  transferHistoriesCollection,
};
