const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
	originalPicUrl: {
		type: String,
		required: true
	},
	smallPicUrl: {
		type: String,
		required: true
	},
	level: {
		type: Number,
		require: true
	},
	createBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	reacts: [{	
		type: mongoose.Schema.Types.ObjectId,
		ref: 'React'
	}],
	replies: [this],
	replyTo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	createAt: {
		type: Date,
		default: Date.now
	}
})


module.exports = mongoose.model('Topic', TopicSchema);