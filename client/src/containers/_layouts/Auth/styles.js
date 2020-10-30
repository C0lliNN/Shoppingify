import styled from 'styled-components';
import * as variables from '../../../helpers/style-constants';

export const MainContentWrapper = styled.div`
  margin-left: ${variables.NAVBAR_XS_SIZE}px;
  height: 100%;

  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    margin-left: ${variables.NAVBAR_MD_SIZE}px;
    margin-right: ${variables.INFO_BAR_MD_SIZE}px;
  }
  @media (min-width: ${variables.LG_BREAK_POINT}px) {
    margin-right: ${variables.INFO_BAR_LG_SIZE}px;
  }
`;