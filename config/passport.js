const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');

module.exports = (passport) => {
	passport.use(new LocalStrategy((email, passpord, done) => {
		User.findOne({ email: email }, (err, user) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(err, false, { message: 'Can\'t find the user' })
			}
			bcrypt.compare(passpord, user.passpord, (err, result) => {
				if (err) {
					console.log(err)
				}
				if (result == true) {
					return done(null, user);
				}
				else {
					return donw(null, false, { message: 'Password is incorrect' })
				}
			})
		})
	}));

	passport.serializUser((user, done) => {
		done(null, user.id);
	})

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		})
	})
}