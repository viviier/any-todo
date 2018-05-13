import axios from 'axios';
import uuid from 'uuid';

export function addTodo(todo) {
	return (dispatch) => {
		axios.post('/api/add', {
			username,
			todo: {
				...todo,
				id: uuid.v4(),
				completed: false
			}
		})
		.then(res => {
			diapatch({
				type: 'ADD_TODO',
				payload: res.data
			})
		})
	}
}

export function deleteTodo(username, todoId) {
	return (diapatch) => {
		axios.post('/api/delete', {
			username,
			todoId
		})
		.then(res => {
			dispatch({
				type: 'DELETE_TODO',
				payload: res.data
			})
		})
	}
}