import styled from "styled-components";
import * as variables from '../../helpers/style-constants'

export const Container = styled.section`
  padding: 20px 40px;
`;

export const ListName = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-top: 35px;
  @media(min-width: ${variables.LG_BREAK_POINT}px) {
    font-size: ${variables.FONT_SIZE_4};
  }
`