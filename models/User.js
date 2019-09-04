const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: Number
	},
	isVerified: {
		type: Boolean,
		default: false
	},
	createAt: {
		type: Date,
		default: Date.now
	}
})


module.exports = mongoose.model('User', UserSchema);