import axios from 'axios';
import uuid from 'uuid';
import { notification } from 'antd';

export function addTodo(username, text) {
	return (dispatch) => {
		axios.post('/api/add', {
			username,
			todo: {
				text,
				id: uuid.v4(),
				completed: false
			}
		})
		.then(res => {
			dispatch({
				type: 'ADD_TODO',
				payload: res.data.data
			})
		})
		.catch(err => {
			notification['error']({
				message: '添加失败',
				duration: 3				
			});
		});
	}
}

export function toggleTodo(username, todoId, todo) {
	return (dispatch) => {
		axios.post('/api/toggle', {
			username,
			todoId,
			todo
		})
		.then(res => {
			dispatch({
				type: 'TOGGLE_TODO',
				payload: {
					id: res.data.data
				}
			});
		})
	}
}

export function deleteTodo(username, todoId) {
	return (dispatch) => {
		axios.post('/api/delete', {
			username,
			todoId
		})
		.then(res => {
			dispatch({
				type: 'DELETE_TODO',
				payload: res.data.data
			})
		})
		.catch(err => {
			notification['error']({
				message: '删除失败'
			});
		});
	}
}

export function setFilter(filter) {
	return (dispatch) => {
		dispatch({
			type: 'SET_FILTER',
			payload: filter
		})
	}
}