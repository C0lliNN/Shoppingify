import styled from 'styled-components';
import * as variables from '../../helpers/style-constants';

export const StyledInfoBar = styled.aside`
  height: 100%;
  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    position: fixed;
    width: ${variables.INFO_BAR_MD_SIZE}px;
    right: 0;
    top: 0;
  }
  @media (min-width: ${variables.LG_BREAK_POINT}px) {
    width: ${variables.INFO_BAR_LG_SIZE}px;
  }
`;
