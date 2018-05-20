import { combineReducers } from 'redux';

import todoReducer from './todoReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
	todoReducer,
	userReducer
});

export default reducer;