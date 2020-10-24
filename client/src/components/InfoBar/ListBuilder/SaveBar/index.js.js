import PropTypes from 'prop-types';
import React from 'react';
import Button from '../../../UI/Button';
import { StyledSaveBar, ModifiedInput } from './styles';

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
