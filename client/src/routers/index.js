import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Home, Login, Register } from 'component';
import AuthComponent from 'common/component/AuthComponent';

const RouterComponent = () => (
	<Router>
		<div style={{ height: '100%' }}>
			<Switch>
				<AuthComponent exact path='/' component={Home} />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				<Redirect to='/' />
			</Switch>
		</div>
	</Router>
);

export default RouterComponent;