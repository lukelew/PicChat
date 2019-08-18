const mongoose = require('mongoose');
const db = require('../config/db');

const User = new mongoose.Schema({
	name: String,
	password: String
})


module.exports = mongoose.model('User', User);