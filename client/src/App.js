import PropTypes from 'prop-types';
import React, { Suspense } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import InfoBar from './components/InfoBar';
import styled from 'styled-components';
import * as variables from './helpers/style-constants';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './containers/Login';
import { checkAuth } from './store/actions';
import { useEffect } from 'react';
import Spinner from './components/UI/Spinner/Spinner';

const Items = React.lazy(() => import('./containers/Items'));
const Signup = React.lazy(() => import('./containers/Signup/Signup'));
const Logout = React.lazy(() => import('./containers/Logout/Logout'));

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

function App({ isAuth, checkAuth }) {
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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

App.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  checkAuth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = {
  checkAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
