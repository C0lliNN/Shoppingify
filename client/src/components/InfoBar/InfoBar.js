import React from 'react';
import styled from 'styled-components';
import {
  MD_BREAK_POINT,
  LG_BREAK_POINT,
  INFO_BAR_MD_SIZE,
  INFO_BAR_LG_SIZE,
} from '../../Variables';

const StyledInfoBar = styled.aside`
  background-color: green;
  height: 100%;
  @media (min-width: ${MD_BREAK_POINT}px) {
    position: fixed;
    width: ${INFO_BAR_MD_SIZE}px;
    right: 0;
    top: 0;
  }
  @media (min-width: ${LG_BREAK_POINT}px) {
    width: ${INFO_BAR_LG_SIZE}px;
  }
`;

function InfoBar() {
  return (
    <StyledInfoBar>
      <div>InfoBar</div>
    </StyledInfoBar>
  );
}

export default InfoBar;
