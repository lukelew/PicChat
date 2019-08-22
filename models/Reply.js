const mongoose = require('mongoose');
const UserModel = require('./User');

const ReplySchema = new mongoose.Schema({
	pic_url: {
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
	}
})


module.exports = mongoose.model('Reply', ReplySchema);