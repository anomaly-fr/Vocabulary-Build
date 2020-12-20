/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import Login from './containers/Login';
import SignUp from './containers/signup';



export default function Routes() {
  return (
 <App>
      <Switch>
        <Route path={routes.LOGIN} component={Login}/>
        <Route path={routes.HOME} component={HomePage} />
        <Route path={routes.SIGNUP} component={SignUp} />
      </Switch>
      </App>
  );
}
