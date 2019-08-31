const mongoose = require('mongoose');
const User = require('./User');
const React = require('./React');

const TopicSchema = new mongoose.Schema({
	pic_url: {
		type: String,
		required: true
	},
	level: {
		type: Number,
		require: true
	},
	create_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	reacts: [{	
		type: mongoose.Schema.Types.ObjectId,
		ref: 'React'
	}],
	replies: [this],
	reply_to: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	create_at: {
		type: Date,
		default: Date.now
	}
})


module.exports = mongoose.model('Topic', TopicSchema);