const expressJwt = require("express-jwt");
const secret = 'todo-app';

let useSecret = {
	secret,
	init: function (app, path) {
		app.use(expressJwt({ 
			secret,
			getToken: function fromHeader (req) {
			    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Tk') {
					return req.headers.authorization.split(' ')[1];
			    }
			    return null;
		    }
		}).unless({ path }));

		// expressJwt Error handling
		app.use(function (err, req, res, next) {
		  if (err.name === 'UnauthorizedError') {
		    res.status(401).send('invalid token...');
		  }
		});
	}
}

module.exports = useSecret;