import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import { loadState, saveState } from 'common/utils';
import reducer from './reducers';

const persistedState = loadState();
const middleware = applyMiddleware(thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, persistedState, composeEnhancers(middleware));

store.subscribe(throttle(() => {
	saveState(store.getState())
}, 1000));

export default store;