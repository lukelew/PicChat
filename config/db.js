const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/picChat', {useNewUrlParser: true})
	.then(() => {
		console.log('Database connection successfully')
	})
	.catch(err => {
		console.log('connection error')
	})


const db = mongoose.connection;
module.exports = mongoose;