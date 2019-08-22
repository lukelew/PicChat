const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');

router.use(express.json());

router.get('/', (req, res) => {
	res.send('This is the index of posts');
})

// create a new post
router.post('/', (req, res) => {
	var topic = new Topic({
		pic_url: req.body.pic_url,
		create_by: req.body.user_id,
	})

	topic.save()
		.then(newTopic => {
			console.log('New topic saved!');
			res.send('Successed!')
		})
		.catch(err => {
			console.error(err)
		})
})

// get all posts or with paginations
// router.get('/posts', (req, res) => {
// 	// Topic.find()
// })


module.exports = router;