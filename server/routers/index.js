function setRouter(app) {
	app.use(require('./basic'));
	app.use('/api', require('./api'));
}

module.exports = setRouter;