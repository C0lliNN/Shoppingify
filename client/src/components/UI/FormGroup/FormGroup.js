import React from 'react';
import styled from 'styled-components';
import {
  BORDER_RADIUS_1,
  COLORS,
  FONT_SIZE_2,
  FONT_FAMILY,
} from '../../../helpers/style-constants';
import PropTypes from 'prop-types';

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  margin-bottom: 10px;
`;

const formControlStyles = `
  display: block;
  order: 2;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 12px;
  border: 2px solid ${COLORS.gray_2};
  border-radius: ${BORDER_RADIUS_1};
  outline: none;
  font-size: ${FONT_SIZE_2};
  font-family: ${FONT_FAMILY};
  font-weight: 500;
  color: ${COLORS.black_2};
  &:focus {
    border-color: ${COLORS.primary};
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3);
    +label {
      color: ${COLORS.primary}
    }
  }
  &::placeholder {
    color: ${COLORS.gray_2};
  };
`;
const Input = styled.input`
  ${formControlStyles}
`;

const Textarea = styled.textarea`
  ${formControlStyles}
`;

const Select = styled.select`
  ${formControlStyles}
`;

const Label = styled.label`
  display: block;
  width: 100%;
  color: ${COLORS.black_2};
  font-weight: 600;
  margin-bottom: 5px;
  font-size: ${FONT_SIZE_2};
`;

function Wrapper(props) {
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

  return <FormGroup>{children}</FormGroup>;
}

Wrapper.Input = Input;
Wrapper.Textarea = Textarea;
Wrapper.Select = Select;
Wrapper.Label = Label;

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Wrapper;
