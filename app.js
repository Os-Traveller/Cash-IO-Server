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
const addTransaction = require('./routes/transaction/addTransaction');
const userSummary = require('./routes/user/getSummary');
const getTransaction = require('./routes/transaction/getTransaction');
const updateTransaction = require('./routes/transaction/updateTransaction');
const deleteTransaction = require('./routes/transaction/deleteTransaction');

// using routes
app.use('/dev', dev);
app.use('/sign-up', singUp);
app.use('/google-login', googleLogin);
app.use('/transaction/add', addTransaction);
app.use('/user-summary', userSummary);
app.use('/get-transaction', getTransaction);
app.use('/update-transaction', updateTransaction);
app.use('/delete-transaction', deleteTransaction);

// listen on port
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

app.get('/', function (_, res) {
  res.send('Server Connected');
});
