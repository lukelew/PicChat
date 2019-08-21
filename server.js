const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

// Session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// Connect flash
app.use(flash());

// Routers
const users = require('./routes/users')
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/users', users);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});



app.listen(process.env.PORT || 8080);