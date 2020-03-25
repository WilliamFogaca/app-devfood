import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/* Routes URLs */
import { loginRoute } from './Routes';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: loginRoute,
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

export default PrivateRoute;

