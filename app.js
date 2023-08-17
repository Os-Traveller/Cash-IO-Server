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
const singUp = require('./routes/authentication/signUp');
const googleLogin = require('./routes/authentication/googleLogin');
const transaction = require('./routes/transaction/transaction');

// using routes
app.use('/sign-up', singUp);
app.use('/google-login', googleLogin);
app.use('/transaction', transaction);

// listen on port
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

app.get('/', function (_, res) {
  res.send('Server Connected');
});
