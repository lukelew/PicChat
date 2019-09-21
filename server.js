const express = require('express');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
var cors = require('cors');

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
app.use(cors());

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

const images = require('./routes/images');
app.use('/images', images);

server.listen(8080);

io.on('connection', function (socket) {
	console.log('new user connected');
});