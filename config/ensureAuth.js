module.exports = {
	ensureAuthenticated: (req, res, next) => {
		if (req.isAuthenticated()) {
			return next();
		}
		else{
			res.send({
				status: 'failure',
				msg: 'You need to login first'
			})
		}
	}
}