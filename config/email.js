const nodemailer = require('nodemailer');
const cryptoRandomString = require('crypto-random-string');

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'ailuqun313@gmail.com',
		pass: 'l9u9q9u9n9'
	}
});

module.exports.transporter = transporter;