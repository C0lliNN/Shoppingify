import styled from 'styled-components';
import * as variables from '../../../helpers/style-constants';

export const StyledFromGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  margin-bottom: 25px;

  & span {
    order: 3;
  }
`;

export const formControlStyles = `
  display: block;
  order: 2;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 12px;
  border: 2px solid ${variables.COLORS.gray_2};
  border-radius: ${variables.BORDER_RADIUS_1};
  outline: none;
  font-size: ${variables.FONT_SIZE_2};
  font-family: ${variables.FONT_FAMILY};
  font-weight: 500;
  color: ${variables.COLORS.black_2};
  &:focus {
    border-color: ${variables.COLORS.primary};
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3);
    +label {
      color: ${variables.COLORS.primary}
    }
  }
  &::placeholder {
    color: ${variables.COLORS.gray_2};
  };
`;
export const Input = styled.input`
  ${formControlStyles}
`;

export const Textarea = styled.textarea`
  ${formControlStyles}
`;

export const Select = styled.select`
  ${formControlStyles}
`;

export const Label = styled.label`
  display: block;
  width: 100%;
  color: ${variables.COLORS.black_2};
  font-weight: 600;
  margin-bottom: 5px;
  font-size: ${variables.FONT_SIZE_2};
`;
