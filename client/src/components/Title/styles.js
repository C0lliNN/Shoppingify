import * as variables from '../../helpers/style-constants';
import styled from 'styled-components';

export const H1 = styled.h1`
  font-family: ${variables.FONT_FAMILY};
  font-size: ${variables.FONT_SIZE_3};
  font-weight: 600;
  @media (min-width: ${variables.LG_BREAK_POINT}px) {
    font-size: ${variables.FONT_SIZE_4};
  }
`;