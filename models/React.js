const mongoose = require('mongoose');
const User = require('./User');
const Topic = require('./Topic');

const ReactSchema = new mongoose.Schema({
	emoji: {
		type: String,
		required: true
	},
	createBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	reactTo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Topic',
		required: true
	},
	createAt: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('React', ReactSchema);