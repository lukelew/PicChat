const express = require('express');
const app = express();
var server = require('http').Server(app);
const path = require('path');
const session = require('express-session');
const passport = require('passport');
var cors = require('cors');

const port = process.env.PORT || 8080;

// Database Config
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
app.use(cors());

// Routers
const users = require('./routes/users');
app.use('/users', users);

const topics = require('./routes/topics');
app.use('/topics', topics);

const reacts = require('./routes/reacts');
app.use('/reacts', reacts);

const notifications = require('./routes/notifications');
app.use('/notifications', notifications);

const images = require('./routes/images');
app.use('/images', images);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/client/build/')));

	app.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, '/client/build/', 'index.html'));
	});
}

// Start the server on defined port
server.listen(port);