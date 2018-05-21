const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User, Todo } = require('../../models');
const Secret = require('../../config/secret.config.js').secret;

router.get('/home', (req, res) => {

});

// todo
router.post('/add', (req, res) => {
	let {username, todo} = {...req.body};

	Todo.addTodo(username, todo, (err, data) => {
		if (err || !data) {
			return res.status(400).json({
				ok: 0,
				message: '添加失败'
			});
		}

		res.json({
			ok: 1,
			message: '添加成功',
			data: todo
		});

		// Todo.getList(username, (err, data) => {
		// 	if (err) {
		// 		res.status(400).json({
		// 			ok: 0,
		// 			message: '获取list失败'
		// 		});
		// 	}

		// 	res.status(200).json({
		// 		ok: 1,
		// 		message: '添加成功',
		// 		data
		// 	});
		// });
		// res.status(200).json({
		// 	ok: 1,
		// 	message: '添加成功'
		// });
	});
});

router.post('/toggle', (req, res) => {
	let {username, todoId, todo} = {...req.body};
	Todo.updateTodo(username, todoId, todo, (err, data) => {
		Todo.getList(username, (err, data) => {
			if (err || !data) {
				return res.status(400).json({
					ok: 0,
					message: '获取list失败'
				});
			}

			res.status(200).json({
				ok: 1,
				message: '更改成功',
				data: todoId
			});
		});
	})
});

router.post('/delete', (req, res) => {
	let {username, todoId} = {...req.body};
	Todo.deleteTodo(username, todoId, (err, data) => {
		Todo.getList(username, (err, data) => {
			if (err || !data) {
				return res.status(400).json({
					ok: 0,
					message: '获取list失败'
				});
			}

			res.status(200).json({
				ok: 1,
				message: '删除成功',
				data: todoId
			});
		});
	});
});

module.exports = router;