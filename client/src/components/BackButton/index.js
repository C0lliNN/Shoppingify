import PropTypes from 'prop-types';
import React from 'react';
import { StyledButton, Icon } from './styles';

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
