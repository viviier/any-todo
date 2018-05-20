import axios from 'axios';
import uuid from 'uuid';

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
	}
}