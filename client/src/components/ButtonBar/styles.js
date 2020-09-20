import styled from 'styled-components';
import * as variables from '../../helpers/style-constants';

export const ButtonBarWrapper = styled.div`
  padding: 20px 0px;
  display: block;
  background: transparent;
  text-align: center;

  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    position: fixed;
    bottom: 0;
    right: 0;
    background: #fefefe;
    width: ${variables.INFO_BAR_MD_SIZE}px;
  }
  @media (min-width: ${variables.LG_BREAK_POINT}px) {
    width: ${variables.INFO_BAR_LG_SIZE}px;
  }
`;