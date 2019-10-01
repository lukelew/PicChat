const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Notification = require('../models/Notification');
const { ensureAuthenticated } = require('../config/ensureAuth');

router.use(express.json());

router.get('/toUser', ensureAuthenticated, (req, res) => {
    if (!req.user._id) {
        res.send({
            status: 'failure',
            message: 'You need to login in to get your topics!'
        })
    }
    Notification
    .find({ toUser: req.user._id })
    .populate('fromUser')
    .exec((err, docs) => {
        res.send(docs)
    })
})

module.exports = router;