const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');

module.exports = (passport) => {
	// for the passport local strategy to authenticate user
	passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {
		User.findOne({ email: email }, (err, user) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(err, false, { message: 'Can\'t find the user' })
			}
			bcrypt.compare(password, user.password, (err, result) => {
				if (err) {
					console.log(err)
				}
				if (result == true) {
					return done(null, user);
				}
				else {
					return done(null, false, { message: 'Password is incorrect' })
				}
			})
		})
	}));

	passport.serializeUser((user, done) => {
		done(null, user.id);
	})

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		})
	})
}