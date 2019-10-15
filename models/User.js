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
		type: Number,
		default: 0
	},
	reactTimes: {
		type: Number,
		default: 0
	},
	topicTimes: {
		type: Number,
		default: 0
	},
	createAt: {
		type: Date,
		default: Date.now
	}
})


module.exports = mongoose.model('User', UserSchema);