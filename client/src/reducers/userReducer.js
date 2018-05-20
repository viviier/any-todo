export default function todo(state = {}, action) {
	switch(action.type) {
		case 'CREATE_USER':
			return {
				...action.payload
			};
		case 'LOGINOUT_USER':
			return {};
		default: return state;
	}
}