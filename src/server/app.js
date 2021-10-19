'use strict';

const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');

const PORT = process.env.PORT || 8001;

const app = express();

app.use(morgan('tiny'));

app.use(favicon(__dirname + '/../client/favicon.png'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client/')));

app.get('/', (req, res) => {
  res.send('hello from my app');
});

app.listen(PORT, ()=>{
  debug(`listening on port ${chalk.green(PORT)}`);
});
