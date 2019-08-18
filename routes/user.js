const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
	res.send('this is the index of users');
})

router.post('/sign',(req, res) => {
	res.send('teasdfas');
	console.log('nothing')
	// let user = new User({
	//   name: 'Tianlin'
	// })

	// user.save()
	// 	.then(doc => {
	// 		console.log(doc)
	// 	})
	// 	.catch(err => {
	// 		console.error(err)
	// 	})
})

module.exports = router;