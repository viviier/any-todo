export default function todo(state = [], action) {
	switch(action.type) {
		case 'CREATE_TODO':
			return [
				...state,
				...action.payload
			];
		case 'ADD_TODO': 
			return [
				...state,
				{
					...action.payload
				}
			];
		case 'DELETE_TODO':
			return state.filter(item => {
				return item.id !== action.payload.id
			});
		case 'TOGGLE_TODO':
			return state.map(item => {
				if (item.id === action.payload.id) {
					return {
						...item,
						completed: !item.completed
					}
				}
				return item;
			});
		default: return state;
	}
}