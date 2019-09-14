const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
const React = require('../models/React');
const { ensureAuthenticated } = require('../config/ensureAuth');

router.use(express.json());

// fetch all reacts
router.get('/', (req, res) => {
	React.find({}, (err, docs) => {
		res.send(docs)
	})
})

// add a new react
router.post('/', ensureAuthenticated, (req, res) => {
	// get the current topic
	Topic.findById(req.body.topic_id, (err, topic) => {
		if(!topic){
			return res.send({
				status: 'failure',
				message: 'Can\'t find this topic'
			})
		}
		else{
			var react = new React({
				emoji: req.body.emoji,
				createBy: req.user._id,
				reactTo: topic._id
			})

			react.save()
				.then(newReact => {
					topic.reacts.push(newReact._id)
					topic.save()
					res.send({
						status: 'success',
						message: 'React added!',
						data: newReact
					})
				})
				.catch(err => {
					console.error(err)
				})
		}
	})
})

// update a react
router.put('/', ensureAuthenticated, (req, res) => {
	React.findById(req.body.react_id, (err, react) => {
		if(!react){
			return res.send({
				status: 'failure',
				message: 'Can\'t find this react'
			})
		}
		else{
			react.emoji = req.body.emoji
			react.save();
			res.send({
				status: 'success',
				message: 'React updated!'
			})
		}
	})
})

// delete a react
router.delete('/', ensureAuthenticated, (req, res) => {
	const currentReactId = req.body.react_id
	React.findById(currentReactId, (err, react) => {
		if(!react){
			return res.send({
				status: 'failure',
				message: 'Can\'t find this react'
			})
		}
		else{
			react.remove((err) => {
				if(err) throw err;
				res.send({
					status: 'success',
					message: 'React deleted!'
				});
				Topic.findById(react.react_to, (err, topic) => {
					topic.reacts.pull(currentReactId);
					topic.save();
					console.log(topic)
				})
			});
		}
	})
})

module.exports = router;