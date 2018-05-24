export default function todo(state = {}, action) {
	switch(action.type) {
		case 'CREATE_TODO':
			return {
				...state,
				filter: 'SHOW_ACTIVE',
				todos: [...action.payload]
			};
		case 'ADD_TODO': 
			return {
				...state,
				todos: [
					...state.todos,
					{
						...action.payload
					}
				]
			};
		case 'DELETE_TODO':
			return {
				...state,
				toods: state.todos.filter(item => {
					return item.id !== action.payload.id
				})
			}
		case 'TOGGLE_TODO':
			return {
				...state,
				todos: state.todos.map(item => {
					if (item.id === action.payload.id) {
						return {
							...item,
							completed: !item.completed
						}
					}
					return item;
				})
			}
		case 'LOGINOUT_USER':
			return {};

		// filter
		case 'SET_FILTER':
			return {
				...state,
				filter: action.payload
			}
		default: return state;
	}
}