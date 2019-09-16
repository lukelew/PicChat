const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
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
			.lean()
			.exec((err, docs) => {
				if (err) throw err;
				// if there is a login user
				if(req.user){ 
					// create new array to insert the 'yourReact' field
					var editedDocs = [];
					docs.map(topic => {
						topic.reacts.map(react => {
							if (react.createBy.equals(req.user._id)) {
								topic.yourReact = {
									"_id": react._id,
									"emoji": react.emoji,
								}
							}
						})
						editedDocs.push(topic)
					})
					res.send(editedDocs)
				}
				else{
					res.send(docs)
				}
			});
	}
	else{
		// fetch one particular topic
		 Topic
			.findById(req.query.id)
			.populate('reacts')
			.populate('createBy')
			.populate({
				path: 'replies',
				populate: {
					path: 'createBy'
				}

			})
			.lean()
			.exec((err, doc) => {
				if (err) throw err;
				if(req.user){
					doc.reacts.map(react => {
						if (react.createBy.equals(req.user._id)) {
							doc.yourReact = {
								"_id": react._id,
								"emoji": react.emoji,
							}
						}
					})
					res.send(doc)
				}
				else{
					res.send(doc)
				}
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




