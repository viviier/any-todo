const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Secret = require('../../config/secret.config.js').secret;

const {User, Todo} = require('../../models');

router.post('/login', (req, res) => {
	User.findUser(req.body.username, (err, data) => {
		if (err || !data) {
			return res.status(400).json({
				ok: 0,
				message: '登录失败'
			});
		}
		
		let {username, name, password} = data;

		if ( req.body.password === password) {
			let token = jwt.sign({username, name}, Secret);

			Todo.getList(req.body.username, (err, data) => {
				if (err || !data) {
					return res.status(400).json({
						ok: 0,
						message: '获取list失败'
					});
				}

				res.status(200).json({
					ok: 1,
					message: '登录成功',
					token,
					list: data.list,
					userInfo: {
						username,
						name
					}
				});
			});
		}
	})
});

router.post('/reg', (req, res) => {
	User.createUser(req.body).then((data, err) => {
		if (err || !data) {
			return res.status(400).json({
				ok: 0,
				message: 'create user filed'
			});
		}

		return Todo.createList({username: req.body.username}).then((data, err) => {
			if (err || !data) {
				return res.status(400).json({
					ok: 0,
					message: 'create list filed'
				});
			}

			res.status(200).json({
				ok: 1,
				message: '创建成功'
			});
		});
	});
});

module.exports = router;