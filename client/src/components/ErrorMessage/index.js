import PropTypes from 'prop-types';
import React from 'react';
import { StyledErrorMessage, Title, Message } from './styles';

function ErrorMessage({ message }) {
  return (
    <StyledErrorMessage>
      <Title>Something Went Wrong!</Title>
      <Message>{message}</Message>
    </StyledErrorMessage>
  );
}
ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
