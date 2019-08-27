const mongoose = require('mongoose');
const UserModel = require('./User');
const ReplyModel = require('./Reply');
const ReactModel = require('./React');

const TopicSchema = new mongoose.Schema({
	pic_url: {
		type: String,
		required: true
	},
	create_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'UserModel',
		required: true
	},
	reacts: [{	
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ReactModel'
	}],
	replies: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ReplyModel'
	}],
	create_at: {
		type: Date,
		default: Date.now
	}
})


module.exports = mongoose.model('Topic', TopicSchema);