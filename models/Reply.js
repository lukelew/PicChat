const mongoose = require('mongoose');
const UserModel = require('./User');
const ReactModel = require('./React');

const ReplySchema = new mongoose.Schema({
	pic_url: {
		type: String,
		required: true
	},
	create_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'UserModel',
		required: true
	},
	reply_to: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'UserModel',
		required: true
	},
	reacts: [{	
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ReactModel'
	}],
	create_at: {
		type: Date,
		default: Date.now
	}
})


module.exports = mongoose.model('Reply', ReplySchema);