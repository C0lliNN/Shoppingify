import PropTypes from 'prop-types';
import React from 'react';
import { Container, Card } from './styles';

function DefaultLayout({ children }) {
  return (
    <Container>
      <Card>
        {children}
      </Card>
    </Container>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.any,
};

export default DefaultLayout;
