const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');
const nodemailer = require('nodemailer');
const { transporter} = require('../config/email');
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
					id: req.user.id
				}
			})
		});
	})(req, res, next);
});


// register
router.post('/register', (req, res) => {
	User.findOne({ name: req.body.name }, (err, user) => {
		// check the uniqueness of user name
		if (user) {
			console.error('Username exists.')
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
				else {
					bcrypt.hash(req.body.password, saltRounds, (err, hashPassword) => {
						var user = new User({
							name: req.body.name,
							email: req.body.email,
							password: hashPassword,
						})

						user.save()
							.then(newUser => {
								var token = new Token({
									userId: newUser.id,
									token: cryptoRandomString({length: 64})
								})

								token.save()
									.then(newToken => {
										var sendToken = newToken.token;
										console.log(sendToken)
										transporter.sendMail({
											from: 'noreply@picchat.me', 
											to: '13298498@student.uts.edu.au', 
											subject: 'Please use the link below to verify your account', 
											html: '<div><h1>Thanks for registering in PicChat.</h1><p>Please click this link to verify your account.<p><a href="http://localhost:8080/users/verify?token="' + sendToken  + '">Verify Now</a></div>' 
										});

										res.send({
											status: 'success',
											message: 'Register successfully'
										})
									})
								
								// res.redirect('/users/login')
							})
							.catch(err => {
								console.error(err)
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
	transporter.sendMail({
		from: 'noreply@picchat.me', // sender address
		to: 'ailuqun313@hotmail.com', // list of receivers
		subject: 'Please use the link below to verify your account', // Subject line
		html: '<b>Your number is ' + cryptoRandomString({length: 64})  + '</b>' // html body
	});
	res.send('done')
})
	

module.exports = router;






