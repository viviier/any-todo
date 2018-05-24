const mongoose = require('mongoose');

let db = {
	connect: function() {
		mongoose.connect('mongodb://localhost/todo');
	}
};

module.exports = db;
