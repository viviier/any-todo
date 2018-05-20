import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// localStorage写在外面的话，会导致页面跳转时无法获取最新的，造成循环，所以写在里面

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      )
    }
  />
);

export default PrivateRoute;