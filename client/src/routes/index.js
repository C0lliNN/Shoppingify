import React from 'react';
import { Switch } from 'react-router';
import Route from './Route';

const Login = React.lazy(() => import('../containers/Login'));
const Items = React.lazy(() => import('../containers/Items'));
const History = React.lazy(() => import('../containers/History'));
const Signup = React.lazy(() => import('../containers/Signup'));
const Logout = React.lazy(() => import('../containers/Logout'));
const List = React.lazy(() => import('../containers/List'));
const Statistics = React.lazy(() => import('../containers/Statistics'));

export default function Routes() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/history/:id" component={List} isPrivate />
      <Route path="/history" component={History} isPrivate />
      <Route path="/statistics" component={Statistics} isPrivate />
      <Route path="/logout" component={Logout} isPrivate />
      <Route path="/" component={Items} isPrivate />
    </Switch>
  );
}
