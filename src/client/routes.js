import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
// eslint-disable-next-line
import moleculeRoutes from 'moleculeAppRoutes';

const Routes = () => (
  <Switch>
    {moleculeRoutes.map((route) => (
      <Route key={route.path} {...route} />
    ))}
  </Switch>
);


export default Routes;
