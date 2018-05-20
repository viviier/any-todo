import axios from 'axios';

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
			});
	}
}

export function userLoginOut() {
	return (dispatch) => {
		localStorage.removeItem('token');
		
		dispatch({
			type: 'LOGINOUT_USER'
		});
	}
}