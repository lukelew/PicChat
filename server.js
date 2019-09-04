const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Database
const db = require('./config/db');

// Passport Config
require('./config/passport')(passport);

// Session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const users = require('./routes/users');
app.use('/users', users);

const topics = require('./routes/topics');
app.use('/topics', topics);

const reacts = require('./routes/reacts');
app.use('/reacts', reacts);

app.listen(process.env.PORT || 8080);