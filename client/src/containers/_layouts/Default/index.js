import PropTypes from 'prop-types';
import React from 'react';
import logo from '../../../assets/images/logo.svg';
import { Container, Card, TitleBar, Title } from './styles';

function DefaultLayout({ children, title }) {
  return (
    <Container>
      <Card>
        <TitleBar>
          <img src={logo} alt="Shoppingify" />
          <Title>{title}</Title>
          <img src={logo} alt="Shoppingify" />
        </TitleBar>
        {children}
      </Card>
    </Container>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string.isRequired,
};

export default DefaultLayout;
