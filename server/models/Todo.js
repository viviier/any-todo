const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
	username: {
		type: String,
		required: [true, 'username is required']
	},
	list: [{
		text: String,
		completed: {
			type: Boolean,
			default: false
		},
		id: String
	}]
});

// statics
todoSchema.statics = {
	createList: function (username, cb) {
		return this.create(username).then(cb);
	},
	getList: function (username, cb) {
		// 不要用 `箭头函数`，会改变this的指向
		return this.findOne({username}, cb);
	},
	addTodo: function (username, todo, cb) {
		return this.update({username}, { $push: {list: todo}}, cb);
	},
	deleteTodo: function (username, todoId, cb) {
		return this.update({username}, { $pull: {list: {id: todoId}}}, cb);
	},
	updateTodo: function (username, todoId, todo, cb) {
		return this.update({username, "list.id": todoId}, { $set: { "list.$": todo }}, cb);
	}
};

module.exports = mongoose.model('Todo', todoSchema);