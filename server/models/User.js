const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'name is required'],
		trim: true
	},
	username: {
		type: String,
		required: [true, 'username is required']
	},
	password: {
		type: String,
		required: [true, 'password is required']
	},
	created: {
		type: Date,
		default: Date.now
	}
});

// statics
userSchema.statics = {
	createUser: function (user, cb) {
		return this.create(user).then(cb);
	},
	findUser: function (username, cb) {
		return this.findOne({username}, cb);
	}
}

// userSchema.statics.createUser = function (user, cb) {
// 	return this.create(user).then(cb);
// };

// userSchema.statics.findUser = function (username, cb) {
// 	return this.find({username}, cb);
// };

module.exports = mongoose.model('User', userSchema);