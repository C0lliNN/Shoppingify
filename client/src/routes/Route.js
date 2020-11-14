import PropTypes from 'prop-types';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import Spinner from '../components/UI/Spinner';
import DefaultLayout from '../containers/_layouts/Default';
import AuthLayout from '../containers/_layouts/Auth';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const signed = useSelector((state) => state.auth.token);

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/" />;
  }

  const Layout = signed ? AuthLayout : DefaultLayout;

  return (
    <Route
      {...rest}
      render={() => (
        <Suspense fallback={<Spinner />}>
          <Layout>
            <Component />
          </Layout>
        </Suspense>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  component: PropTypes.any.isRequired,
  isPrivate: PropTypes.bool,
};
