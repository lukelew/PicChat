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
router.post('/login',
	passport.authenticate('local'), (req, res) => {
		console.log('You\'re in!')
		res.send('User Authenticated')
	});


// register
router.post('/register', (req, res) => {
	User.findOne({ name: req.body.name }, (err, user) => {
		// check the uniqueness of user name
		if (user) {
			console.log('user already exisit')
			res.send('user already exisit')
		}
		else {
			User.findOne({ email: req.body.email }, (err, email) => {
				// check the uniqueness of user email
				if (email) {
					console.log('This email has already been signed up')
					res.send('This email has already been signed up')
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
								res.send('Successed!')
								// req.flash('msg', newUser);
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
	res.send('User logout')
	console.log('User logout')
});
	

module.exports = router;






