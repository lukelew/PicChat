const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Topic = require('../models/Topic');
const React = require('../models/React');
const Notification = require('../models/Notification');
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
	Topic
	.findById(req.body.topic_id)
	.populate('reacts')
	.exec((err, topic) => {
		if(!topic){
			return res.send({
				status: 'failure',
				message: 'Can\'t find this topic'
			})
		}
		else{
			const react = new React({
				emoji: req.body.emoji,
				createBy: req.user._id,
				reactTo: topic._id
			})

			react.save()
				.then(newReact => {
					// push the id of this react to its relative topic
					topic.reacts.push(newReact._id)
					topic.save()
					// reactTimes of Current user add 1
					User.findById(req.user._id, (err, user) => {
						user.reactTimes += 1;
						user.save();
					})

					if(topic.level===1){
						belongTo = topic._id
					}
					else if(topic.level === 2){
						belongTo = topic.replyTo
					}
					else if(topic.level === 3){
						Topic
						.findById(topic.belongTo)
						.exec((err, lv2Topic) => {
							belongTo = lv2Topic.replyTo
						})
						
					}
					// create a new notification
					if (!topic.createBy.equals(req.user._id)){
						const notification = new Notification({
							type: 'react',
							fromUser: req.user._id,
							toUser: topic.createBy,
							content: newReact.emoji,
							belongTo: belongTo,
							atTopic: topic._id
						})
						notification.save()
					}

					res.send({
						status: 'success',
						message: 'React added!',
						newReact: newReact
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
				message: 'React updated!',
				newReact: react
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
			Topic.findById(react.reactTo, (err, topic) => {
				topic.reacts.pull(currentReactId);
				topic.save();
			})
			User.findById(req.user._id, (err, user) => {
				user.reactTimes -= 1;
				user.save();
			})
			Notification
			.find({ atTopic: react.reactTo})
			.remove()
			.exec()

			react.remove((err) => {
				if(err) throw err;
				res.send({
					status: 'success',
					message: 'React deleted!',
					deleteId: currentReactId
				});
			});
		}
	})
})

module.exports = router;