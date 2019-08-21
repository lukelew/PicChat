const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 13;

router.use(express.json());
router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
	res.send('this is the index of users');
})

router.get('/login', (req, res) => {
	res.send({message: req.flash('msg')})
})

// verify the user informations and login
router.post('/login', (req, res) => {
	User.findOne({ name: req.body.name }, (err, user) => {
		if (err) {
			console.log(err)
		}
		else if (!user) {
			console.log('can\'t find user')
		}
		else {
			if (!req.body.password) {
				console.log('no password provided')
			}
			else {
				bcrypt.compare(req.body.password, user.password, (err, result) => {
					console.log(result);
				})
			}
			
		}
		
	})
	res.send('Trying to login');
})

// user registeration
router.post('/sign', (req, res) => {
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
					bcrypt.hash(req.body.password, saltRounds, function(err, hashPassword) {
						var user = new User({
							name: req.body.name,
							email: req.body.email,
							password: hashPassword
						})

						user.save()
							.then(newUser => {
								console.log('New user saved!');
								res.send('Successed!')
								req.flash('msg', newUser);
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

	

module.exports = router;