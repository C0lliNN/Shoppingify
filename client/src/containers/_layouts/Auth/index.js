import PropTypes from 'prop-types';
import React from 'react';
import { MainContentWrapper } from './styles';
import NavBar from '../../../components/NavBar';
import InfoBar from '../../../components/InfoBar';

export default function AuthLayout({ children }) {
  return (
    <>
      <NavBar />
      <MainContentWrapper>{children}</MainContentWrapper>
      <InfoBar />
    </>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};
