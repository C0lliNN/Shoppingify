import styled from 'styled-components';
import * as variables from '../../helpers/style-constants';

export const StyledButton = styled.button`
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
export const Icon = styled.i`
  color: ${variables.COLORS.primary};
  font-size: ${variables.FONT_SIZE_3};
`;
