import styled from 'styled-components';
import * as variables from '../../../helpers/style-constants';

export const Label = styled.label.attrs((props) => ({
  'data-checked': props.checked,
}))`
  position: relative;
  width: 24px;
  height: 24px;
  margin-right: 15px;
  cursor: pointer;
  &[data-checked='true'] ~ h5 {
    text-decoration: line-through;
  }
`;

export const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  &:checked ~ span::after {
    content: '';
    transform: rotate(45deg) scale(1);
    left: 8px;
    top: 3px;
    width: 6px;
    height: 12px;
    border: solid ${variables.COLORS.primary};
    border-radius: 0;
    border-width: 0 2px 2px 0;
    background: transparent;
  }
`;

export const Span = styled.span`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 24px;
  height: 24px;
  background: transparent;
  border-radius: 4px;
  border: 2px solid ${variables.COLORS.primary};
  &::after {
    position: absolute;
    content: '';
    left: 12px;
    top: 12px;
    height: 0px;
    width: 0px;
    transform: rotate(0deg) scale(1);
  }
`;