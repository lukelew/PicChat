const mongoose = require('mongoose');
const UserModel = require('./User');

const React = new mongoose.Schema({
	emoji: {
		type: String,
		required: true
	},
	create_by: {
		type: UserModel.schema,
		required: true
	},
	create_at: {
		type: Date,
		default: Date.now
	},
})