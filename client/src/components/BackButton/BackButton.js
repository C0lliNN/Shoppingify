import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import * as variables from '../../helpers/style-constants';

const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  background: transparent;
  outline: none;
  color: ${variables.COLORS.primary};
  font-size: ${variables.FONT_SIZE_2};
  font-family: ${variables.FONT_FAMILY};
  font-weight: 600;
  display: flex;
  align-items: center;
`;
const Icon = styled.i`
  color: ${variables.COLORS.primary};
  font-size: ${variables.FONT_SIZE_3};
`;

function BackButton({ onClick }) {
  return (
    <StyledButton onClick={onClick}>
      <Icon className="material-icons-round">keyboard_backspace</Icon>
      <span>&nbsp;back</span>
    </StyledButton>
  );
}

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BackButton;
