import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import * as variables from '../../helpers/style-constants';

const StyledErrorMessage = styled.div`
  padding: 15px;
`;

const Title = styled.h4`
  font-family: ${variables.FONT_FAMILY};
  font-size: ${variables.FONT_SIZE_3};
  font-weight: 600;
  color: ${variables.COLORS.danger};
  margin-bottom: 8px;
`;

const Message = styled.p`
  font-family: ${variables.FONT_FAMILY};
  font-size: ${variables.FONT_SIZE_2};
  font-weight: 600;
  color: ${variables.COLORS.danger};
`;

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
