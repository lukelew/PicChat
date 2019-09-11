const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Topic = require('../models/Topic');
const React = require('../models/React');
const { ensureAuthenticated } = require('../config/ensureAuth');

router.use(express.json());

// fetch topics
router.get('/', (req, res) => {
	if(!req.query.id){
		// fetch all topics
		Topic
			.find({level: 1})
			.populate('reacts')
			.populate('createBy')
			.exec((err, docs) => {
				console.log(docs)
				res.send(docs)
			});
	}
	else{
		// fetch one particular topic
		 Topic
			.find({ _id: req.query.id })
			.populate('reacts')
			.populate('createBy')
			.populate({
				path: 'replies',
				populate: {
					path: 'createBy'
				}

			})
			.exec((err, docs) => {
				console.log(docs)
				res.send(docs)
			});
	}
	
})

// create a new topic
router.post('/', ensureAuthenticated, (req, res) => {
	var topic = new Topic({
		picUrl: req.body.picUrl,
		createBy: req.user._id,
		level: 1
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

// update a topic
router.put('/', ensureAuthenticated, (req, res) => {
	// get the current topic
	Topic.findById(req.body.topic_id, (err, topic) => {
		if(!topic){
			return res.send('Can\'t find this topic')
		}
		else{
			topic.pic_url = req.body.picUrl
			topic.save();
			res.send('Topic update successed!')
		}
	})
})

// delete a topic
router.delete('/', ensureAuthenticated, (req, res) => {
	Topic.findById(req.body.topic_id, (err, topic) => {
		if(!topic){
			return res.send('Can\'t find this topic')
		}
		else{
			topic.remove();
			res.send('Delete successed!')
		}
	})
})

// reply to a topic
router.post('/reply', ensureAuthenticated, (req, res) => {
	Topic.findById(req.body.replyTo, (err, topic) => {
		if(!topic){
			return res.send('can\'t find the topic you want to reply')
		}
		else{
			var reply = new Topic({
				picUrl: req.body.picUrl,
				createBy: req.user._id,
				replyTo: req.body.replyTo,
				level: 2
			})

			reply.save()
				.then(newReply => {
					topic.replies.push(newReply._id)
					topic.save()
					console.log('New reply saved!')
					res.send('Successed!')
				})
		}
	})
	
})

module.exports = router;




