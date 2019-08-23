const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Topic = require('../models/Topic');

router.use(express.json());

// fetch topics
router.get('/', (req, res) => {
	Topic.find({}, (err, docs) => {
		res.send(docs)
	})
})

// create a new topic
router.post('/', (req, res) => {
	// get the current poster
	User.findOne({'email': req.body.email},(err, user) => {
		if(!user){
			res.send('Can\'t find this user')
		}
		else{
			var user_id = user._id
			var topic = new Topic({
				pic_url: req.body.pic_url,
				create_by: user_id,
			})

			topic.save()
				.then(newTopic => {
					console.log('New topic saved!');
					res.send('Successed!')
				})
				.catch(err => {
					console.error(err)
				})
		}
	})

})

// update a topic
router.put('/', (req, res) => {
	// get the current topic
	Topic.findById(req.body.topic_id, (err, topic) => {
		if(!topic){
			res.send('Can\'t find this topic')
		}
		else{
			topic.pic_url = req.body.pic_url
			topic.save();
			res.send('Topic update successed!')
		}
	})
})

// delete a topic
router.delete('/', (req, res) => {
	Topic.findById(req.body.topic_id, (err, topic) => {
		if(!topic){
			res.send('Can\'t find this topic')
		}
		else{
			topic.remove();
			res.send('Delete successed!')
		}
	})
})


module.exports = router;