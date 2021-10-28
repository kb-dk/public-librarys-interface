'use strict';

const express = require('express');
const chalk = require('chalk');
const path = require('path');
const debug = require('debug')('app');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

const loans = require('./routes/loans');
const login = require('./routes/login');
const logout = require('./routes/logout');
const PORT = process.env.PORT || 8001;

const app = express();

const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
  '.png'
];

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'KB'}));

app.use(cors({origin: ['http://localhost:4200/', 'http://localhost:4000/'], credentials: true}));

require ('./config/passport.js')(app);

app.use('/api/v1/loans', loans);
app.use('/api/v1/login', login);
app.use('/api/v1/logout', logout);


// Redirect all the other resquests
app.get('*', (req, res) => {
  if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    res.sendFile(path.resolve(`dist/public-librarys-interface/${req.url}`));
  } else {
    res.sendFile(path.resolve('dist/public-librarys-interface/index.html'));
  }
});

app.listen(PORT, ()=>{
  debug(`listening to port ${chalk.green(PORT)}`);
});
