import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import * as variables from '../../helpers/style-constants';

export const StyledNavBar = styled.nav`
  position: fixed;
  height: 100%;
  padding: 20px 0px;
  box-sizing: border-box;
  width: ${variables.NAVBAR_XS_SIZE}px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    width: ${variables.NAVBAR_MD_SIZE}px;
  }
`;

export const Icon = styled.i.attrs((props) => ({
  'data-tip': props['data-tip'],
  'data-for': props['data-for'],
  'data-testid': props['data-testid'],
}))`
  color: #454545;
  font-size: 24px;
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  margin: 20px auto;
  box-sizing: border-box;
  border: 5px solid white;
  text-decoration: none;
`;

export const IconsWrapper = styled.div`
  width: 100%;
`;