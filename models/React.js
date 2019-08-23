const mongoose = require('mongoose');
const UserModel = require('./User');

const ReactSchema = new mongoose.Schema({
	emoji: {
		type: String,
		required: true
	},
	create_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'UserModel',
		required: true
	},
	create_at: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('React', ReactSchema);