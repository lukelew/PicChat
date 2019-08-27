const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
const Reply = require('../models/Reply');
const React = require('../models/React');
const { ensureAuthenticated } = require('../config/ensureAuth');

router.use(express.json());

// add a new reply
router.post('/', ensureAuthenticated, (req, res) => {
	Topic.findById(req.body.topic_id, (err, topic) => {
		if(!topic){
			res.send('Can\'t find this topic')
		}
		else{
			var reply = new Reply({
				pic_url: req.body.pic_url,
				create_by: req.user._id,
				reply_to: req.body.reply_to
			})

			reply.save()
				.then(newReply => {
					console.log('New reply added')
					res.send('New reply added')
				})
				.catch(err => {
					console.error(err)
				})
		}
	})
})

module.exports = router;