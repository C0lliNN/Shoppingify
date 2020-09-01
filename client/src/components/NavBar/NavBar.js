import React from 'react';
import styled from 'styled-components';
import {
  MD_BREAK_POINT,
  NAVBAR_XS_SIZE,
  NAVBAR_MD_SIZE,
} from '../../Variables';

const StyledNavBar = styled.nav`
  position: fixed;
  background-color: red;
  height: 100%;
  width: ${NAVBAR_XS_SIZE}px;

  @media (min-width: ${MD_BREAK_POINT}px) {
    width: ${NAVBAR_MD_SIZE}px;
  }
`;

function NavBar() {
  return (
    <StyledNavBar>
      <div>Test</div>
    </StyledNavBar>
  );
}

export default NavBar;
