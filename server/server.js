'use strict';
const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = require('./router');

const app = express();
mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.ymjtl.mongodb.net/users?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

let db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.on('open', () => console.log('database opened'));
db.on('close', () => console.log('database closed'));

app.use(express.urlencoded({ entended: true }));
app.use(express.json());
app.use((req, res, next) => {
  console.log('request: ', req.method, ' ', req.url);
  next();
});
app.use(cors());

const port = process.env.PORT || 8888;

app.use('/api', router);

app.listen(port, () =>
  console.log('Expressjs server is running on port ', port)
);
