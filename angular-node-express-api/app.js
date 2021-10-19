const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const loans = require('./routes/loans');
const login = require('./routes/login');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser())
app.use('/api/v1/login', login);
app.use('/api/v1/loans', loans);

module.exports = app;
