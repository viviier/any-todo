import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import './index.less';
import store from './store';
import RouterComponent from './routers';
import registerServiceWorker from './registerServiceWorker';

// axios global header
axios.interceptors.request.use(function (config) {
    if (localStorage.getItem('token')) {
        config.headers.Authorization = `Tk ${localStorage.getItem('token')}`;
    }
    
    return config;
}, function (err) {
    return Promise.reject(err);
});

render(
	<Provider store={store}>
		<RouterComponent />
	</Provider>, 
	document.getElementById('root')
);
registerServiceWorker();
