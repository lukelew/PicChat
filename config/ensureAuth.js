module.exports = {
	ensureAuthenticated: (req, res, next) => {
		if (req.isAuthenticated()) {
			return next();
		}
		else{
			res.send('You need to login first')
			// res.redirect('/');
		}
	}
}