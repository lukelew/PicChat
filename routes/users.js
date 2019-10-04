const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');
const cryptoRandomString = require('crypto-random-string');
const Token = require('../models/Token');

router.use(express.json());

router.get('/', (req, res) => {
	if(!req.user){
		res.send({
			status: 'failure',
			message: 'You haven\'t login'
		});
	}
	else{
		res.send({
			status: 'success',
			user: {
				avatar: req.user.avatar,
				name: req.user.name,
				email: req.user.email,
				id: req.user.id
			}
		})
	}
	
})

// login
router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) { 
			return res.send(err);
		}
		if (!user) { 
			return res.send(info); 
		}
		req.login(user, () => {
			console.log('You\'re in!')
			res.send({
				status: 'success',
				message: 'You\'re in',
				user: {
					name: req.user.name,
					email: req.user.email,
					avatar: req.user.avatar,
					id: req.user.id
				}
			})
		});
	})(req, res, next);
});

// verify username
router.post('/verifyUsername', (req, res) => {
	User.findOne({ name: req.body.name }, (err, user) => {
		// check the uniqueness of user name
		if (user) {
			res.send({
				status: 'failure',
				message: 'Username exists.'
			})
		}
		else {
			res.send({
				status: 'success',
				message: 'Username available.'
			})
		}
	})
})

// verify email
router.post('/verifyEmail', (req, res) => {
	User.findOne({ email: req.body.email }, (err, email) => {
		// check the uniqueness of email
		if (email) {
			res.send({
				status: 'failure',
				message: 'Email exists.'
			})
		}
		else {
			res.send({
				status: 'success',
				message: 'Email available.'
			})
		}
	})
})

// register
router.post('/register', (req, res) => {
	User.findOne({ name: req.body.name }, (err, user) => {
		// check the uniqueness of user name
		if (user) {
			res.send({
				status: 'failure',
				message: 'Username exists.'
			})
		}
		else {
			User.findOne({ email: req.body.email }, (err, email) => {
				// check the uniqueness of user email
				if (email) {
					console.error('This email has already been signed up')
					res.send({
						status: 'failure',
						message: 'This email has already been signed up'
					})
				}
				else{
					bcrypt.hash(req.body.password, saltRounds, (err, hashPassword) => {
						var user = new User({
							name: req.body.name,
							email: req.body.email,
							avatar: req.body.avatar,
							password: hashPassword,
						})

						user.save()
						res.send({
							status: 'success',
							message: 'Registering successfully.'
						})
					})
				}
			})
		}
	})

})

// verify a user
router.get('/verify', (req, res) => {
	Token.findOne({token: req.query.token}, (err, token) => {
		if(!token) {
			res.send({
				status: 'failure',
				message: 'Can\'t find this token'
			})
		}
		else{
			User.findById(token.userId, (err, user) => {
				if(!user) {
					res.send({
						status: 'failure',
						message: 'Can\'t find this user'
					})
				}
				else{
					user.isVerified = true
					user.save()
					res.send({
						status: 'success',
						message: 'Congratulation! You\'re verifed!'
					})
				}
			})
		}

	})
})

// logout
router.get('/logout', (req, res) => {
	req.logout();
	res.send({
		status: 'success',
		message: 'User logout'
	})
	console.log('User logout')
});

// send email
router.get('/email', (req, res) => {
	// transporter.sendMail({
	// 	from: 'noreply@picchat.me', // sender address
	// 	to: 'ailuqun313@hotmail.com', // list of receivers
	// 	subject: 'Please use the link below to verify your account', // Subject line
	// 	html: '<b>Your number is ' + cryptoRandomString({length: 64})  + '</b>' // html body
	// });
	const msg = {
		to: '13298498@student.uts.edu.au',
		from: 'ailuqun313@gmail.com',
		subject: 'Sending with Twilio SendGrid is Fun',
		text: 'and easy to do anywhere, even with Node.js',
		html: '<strong>and easy to do anywhere, even with Node.js</strong>',
	};
	sgMail.send(msg);
	res.send('done')
})
	

// leaderboard
router.get('/leaderboard', (req, res) => {
	if(req.query.type == 'mostTopics'){
		User
			.find({})
			.sort({topicTimes: -1})
			.exec((err, docs) => {
				res.send(docs)
			})
	}
	else if(req.query.type == 'mostReacts'){
		User
			.find({})
			.sort({ reactTimes: -1 })
			.exec((err, docs) => {
				res.send(docs)
			})
	}
})

module.exports = router;






