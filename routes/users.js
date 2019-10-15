const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');
const { ensureAuthenticated } = require('../config/ensureAuth');

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

// update a user
router.put('/', ensureAuthenticated, (req, res) => {
	User.findById(req.user._id, (err, user) => {
		user.avatar = req.body.avatar;
		user.save();
		res.send({
			status: 'success',
			message: 'Avatar update created!'
		})
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

// leaderboard
router.get('/leaderboard', (req, res) => {
	if(req.query.type == 'mostTopics'){
		User
			.find({})
			.sort({topicTimes: -1})
			.limit(5)
			.exec((err, docs) => {
				res.send(docs)
			})
	}
	else if(req.query.type == 'mostReacts'){
		User
			.find({})
			.sort({ reactTimes: -1 })
			.limit(5)
			.exec((err, docs) => {
				res.send(docs)
			})
	}
})

module.exports = router;






