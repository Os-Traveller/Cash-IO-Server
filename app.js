const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');

// to read eng file
dotEnv.config();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

// importing routes
const dev = require('./dev');
const singUp = require('./routes/authentication/signUp');
const googleLogin = require('./routes/authentication/googleLogin');
const getWallet = require('./routes/wallet/getWallet');
const addTransaction = require('./routes/transaction/addTransaction');
const getTransaction = require('./routes/transaction/getTransaction');
const updateTransaction = require('./routes/transaction/updateTransaction');
const deleteTransaction = require('./routes/transaction/deleteTransaction');
const getCategory = require('./routes/category/getCategory');
const addWallet = require('./routes/wallet/addWallet');
const updateWallet = require('./routes/wallet/updateWallet');
const transfer = require('./routes/wallet/transferWallet');

// using routes
app.use('/dev', dev);
app.use('/sign-up', singUp);
app.use('/google-login', googleLogin);
app.use('/get-wallet', getWallet);
app.use('/transaction/add', addTransaction);
app.use('/get-transaction', getTransaction);
app.use('/update-transaction', updateTransaction);
app.use('/delete-transaction', deleteTransaction);
app.use('/get-category', getCategory);
app.use('/add-wallet', addWallet);
app.use('/update-wallet', updateWallet);
app.use('/transfer', transfer);

// listen on port
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

app.get('/', function (_, res) {
  res.send('Server Connected');
});
