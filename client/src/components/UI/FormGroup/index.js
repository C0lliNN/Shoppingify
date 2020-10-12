import PropTypes from 'prop-types';
import React from 'react';
import { StyledFromGroup, Input, Textarea, Select, Label } from './styles';

function FormGroup(props) {
  const children = [];

  if (Array.isArray(props.children)) {
    const labelIndex = props.children.findIndex(
      (element) => element.type.displayName === 'styled.label'
    );

    for (let i = 0; i < props.children.length; i++) {
      if (i !== labelIndex) {
        children.push(props.children[i]);
      }
    }

    children.push(props.children[labelIndex]);
  } else {
    children.push(props.children);
  }

  return <StyledFromGroup>{children}</StyledFromGroup>;
}

FormGroup.Input = Input;
FormGroup.Textarea = Textarea;
FormGroup.Select = Select;
FormGroup.Label = Label;

FormGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default FormGroup;
