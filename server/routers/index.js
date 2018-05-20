function setRouter(app) {
	app.use('/auth', require('./basic'));
	app.use('/api', require('./api'));
}

module.exports = setRouter;