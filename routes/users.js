const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');

router.use(express.json());

router.get('/', (req, res) => {
	res.send('This is the index of users');
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
				user: req.user
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
								console.log('New user saved!');
								res.send({
									status: 'success',
									message: 'Register successfully'
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

// logout
router.get('/logout', (req, res) => {
	req.logout();
	// res.redirect('/');
	res.send({
		status: 'success',
		message: 'User logout'
	})
	console.log('User logout')
});
	

module.exports = router;






