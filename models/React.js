const mongoose = require('mongoose');
const User = require('./User');
const Topic = require('./Topic');

const ReactSchema = new mongoose.Schema({
	emoji: {
		type: String,
		required: true
	},
	create_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	react_to: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Topic',
		required: true
	},
	create_at: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('React', ReactSchema);