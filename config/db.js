const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
//mongoose.connect('mongodb://localhost:2÷7017/picChat', {useNewUrlParser: true})
mongoose.connect('mongodb+srv://Luke:l9u9q9u9n9@development-2nzet.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
	.then(() => {
		console.log('Database connection successfully')
	})
	.catch(err => {
		console.log('connection error')
	})


const db = mongoose.connection;
module.exports = mongoose;