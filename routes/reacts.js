const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Topic = require('../models/Topic');
const React = require('../models/React');

router.use(express.json());

router.get('/', (req, res) => {
	res.send('This is the index of reacts');
})

// add a new react
router.post('/', (req, res) => {
	// get the current topic
	Topic.findById(req.body.topic_id, (err, topic) => {
		if(!topic){
			res.send('Can\'t find this topic')
		}
		else{
			var react = new React({
				emoji: req.body.emoji,
				create_by: topic.create_by
			})

			react.save()
				.then(newReact => {
					topic.reacts.push(newReact._id)
					topic.save()
					res.send('React added!')
				})
				.catch(err => {
					console.error(err)
				})
		}
	})

})

// update a react
router.put('/', (req, res) => {
	React.findById(req.body.react_id, (err, react) => {
		if(!react){
			res.send('Can\'t find this react')
		}
		else{
			react.emoji = req.body.emoji
			react.save();
			res.send('React updated successed!')
		}
	})
})

// delete a react
router.delete('/', (req, res) => {
	React.findById(req.body.react_id, (err, react) => {
		if(!react){
			res.send('Can\'t find this react')
		}
		else{
			react.remove();
			res.send('Delete successed!')
		}
	})
})

module.exports = router;