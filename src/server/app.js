'use strict';

const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const cors = require('cors');

const loans = require('./routes/loans');
const login = require('./routes/login');

const PORT = process.env.PORT || 8001;

const app = express();

app.use(cors({
  origin: 'http://localhost:4200/'
}));

app.use(cookieParser());


app.use(morgan('tiny'));

app.use(favicon(__dirname + '/../client/favicon.png'));

app.listen(PORT, ()=>{
  debug(`listening to port ${chalk.green(PORT)}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/login', login);
app.use('/api/v1/loans', loans);
