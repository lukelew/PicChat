const mongoose = require('mongoose');
const ReactModel = require('./React');
const UserModel = require('./User');
const ReplyModel = require('./Reply');

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
	create_at: {
		type: Date,
		default: Date.now
	}
	// reacts: [ ReactModel.schema ],
	// replies: [ this ]
})


module.exports = mongoose.model('Topic', TopicSchema);