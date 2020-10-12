import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Redirect } from 'react-router';
import { logout } from '../../store/actions';

function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  return <Redirect to="/" />;
}

export default Logout;
