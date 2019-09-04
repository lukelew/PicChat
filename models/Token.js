const mongoose = require('mongoose');
const User = require('./User');

const TokenSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	token: {
		type: String,
		required: true
	},
	createAt: {
		type: Date,
		default: Date.now,
		expires: 43200 
	}
})

module.exports = mongoose.model('Token', TokenSchema);