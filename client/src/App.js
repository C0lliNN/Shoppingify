import React, { Suspense } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import InfoBar from './components/InfoBar';
import styled from 'styled-components';
import * as variables from './helpers/style-constants';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './containers/Login';
import { useEffect } from 'react';
import Spinner from './components/UI/Spinner/Spinner';
import { checkAuth } from './store/actions';

const Items = React.lazy(() => import('./containers/Items'));
const Signup = React.lazy(() => import('./containers/Signup'));
const Logout = React.lazy(() => import('./containers/Logout'));

const MainContentWrapper = styled.div`
  margin-left: ${variables.NAVBAR_XS_SIZE}px;
  height: 100%;

  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    margin-left: ${variables.NAVBAR_MD_SIZE}px;
    margin-right: ${variables.INFO_BAR_MD_SIZE}px;
  }
  @media (min-width: ${variables.LG_BREAK_POINT}px) {
    margin-right: ${variables.INFO_BAR_LG_SIZE}px;
  }
`;

function App() {
  const isAuth = useSelector((state) => state.auth.token);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <main className="App">
      <BrowserRouter>
        {isAuth ? (
          <React.Fragment>
            <NavBar />
            <MainContentWrapper>
              <Switch>
                <Redirect from="/signup" to="/" />
                <Redirect from="/login" to="/" />

                <Route
                  path="/logout"
                  render={() => (
                    <Suspense fallback={<Spinner />}>
                      <Logout />
                    </Suspense>
                  )}
                />
                <Route
                  path="/"
                  render={() => (
                    <Suspense fallback={<Spinner />}>
                      <Items />
                    </Suspense>
                  )}
                />
              </Switch>

              <InfoBar />
            </MainContentWrapper>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Switch>
              <Route
                path="/signup"
                render={() => (
                  <Suspense fallback={<Spinner />}>
                    <Signup />
                  </Suspense>
                )}
              />
              <Route path="/" component={Login} />
            </Switch>
          </React.Fragment>
        )}
      </BrowserRouter>
    </main>
  );
}

export default App;
