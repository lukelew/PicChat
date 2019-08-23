const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const app = express();

// Database
const db = require('./config/db');

// Passport Config
require('./config/passport')(passport);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// Connect flash
app.use(flash());

// Routers
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const users = require('./routes/users');
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/users', users);

const topics = require('./routes/topics');
app.use('/topics', topics);

const reacts = require('./routes/reacts');
app.use('/reacts', reacts);

app.listen(process.env.PORT || 8080);