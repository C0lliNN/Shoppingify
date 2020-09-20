import PropTypes from 'prop-types';
import React from 'react';
import { logout } from '../../store/actions';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Redirect } from 'react-router';

function Logout({ logout }) {
  useEffect(() => {
    logout();
  }, [logout]);

  return <Redirect to="/" />;
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(Logout);
