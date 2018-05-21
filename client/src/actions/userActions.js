import axios from 'axios';
import { notification } from 'antd';

export function userLogin(loginInfo, history) {
	return (dispatch) => {
		axios.post('/auth/login', loginInfo)
			.then(res => {
				dispatch({
					type: 'CREATE_USER',
					payload: res.data.userInfo
				});
				dispatch({
					type: 'CREATE_TODO',
					payload: res.data.list
				});

				// history建议跟着一起，在外面的话因为是异步所以会先跳
				localStorage.setItem('token', res.data.token);
				history && history.push('/');
				notification['success']({
					message: '登录成功',
					duration: 3
				});
			})
			.catch(err => {
				notification['error']({
					message: '登录失败',
					duration: 3
				});
			});
	}
}

export function userLoginOut(history) {
	return (dispatch) => {
		dispatch({
			type: 'LOGINOUT_USER'
		});
		
		localStorage.clear();
		history && history.push('/login');
		notification['success']({
			message: '已退出',
			duration: 3
		});
	}
}