import PropTypes from 'prop-types';
import React from 'react';
import FormGroup from '../../../UI/FormGroup/FormGroup';
import Button from '../../../UI/Button/Button';
import styled from 'styled-components';
import * as variables from '../../../../helpers/style-constants';

const StyledSaveBar = styled.form`
  display: flex;
  align-items: center;
  margin: 0px 30px;
  border: 2px solid ${variables.COLORS.primary};
  border-radius: ${variables.BORDER_RADIUS_1};
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  ${({ disabled }) =>
    disabled ? `border-color: ${variables.COLORS.gray_2};` : ''}
`;

const ModifiedInput = styled(FormGroup.Input)`
  border: none;
  flex-grow: 2;
  order: 0;
`;

function SaveBar({ onSave, disabled, name, setName }) {
  function handleOnSubmit(event) {
    event.preventDefault();
    onSave();
  }

  return (
    <StyledSaveBar onSubmit={handleOnSubmit} disabled={disabled}>
      <ModifiedInput
        placeholder="Enter a name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={disabled}
      />
      <Button
        type="submit"
        btnType="raised"
        variant="primary"
        disabled={disabled}
      >
        Save
      </Button>
    </StyledSaveBar>
  );
}

SaveBar.propTypes = {
  disabled: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
};

export default SaveBar;
