import React from 'react';
import styled from 'styled-components';
import * as variables from '../../helpers/style-constants';
import logo from '../../assets/images/logo.svg';
import { NavLink, Link } from 'react-router-dom';
import CartItem from './CartIcon/CartIcon';
import ReactTooltip from 'react-tooltip';

const StyledNavBar = styled.nav`
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

const Icon = styled.i.attrs((props) => ({
  'data-tip': props['data-tip'],
  'data-for': props['data-for'],
  'data-testid': props['data-testid'],
}))`
  color: #454545;
  font-size: 24px;
`;

const StyledNavLink = styled(NavLink)`
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

const IconsWrapper = styled.div`
  width: 100%;
`;

function NavBar() {
  const activeStyle = {
    borderLeftColor: variables.COLORS.primary,
    borderRadius: '5px',
  };

  const tooltipConfig = {
    place: 'right',
    type: 'dark',
    effect: 'solid',
    delayShow: 500,
  };

  return (
    <StyledNavBar>
      <Link to="/">
        <img src={logo} alt="Shopping List Logo" />
      </Link>
      <IconsWrapper>
        <StyledNavLink to="/" activeStyle={activeStyle} exact>
          <Icon
            className="material-icons-round"
            data-tip="Items"
            data-for="items"
            data-testid="itemsIcon"
          >
            toc
          </Icon>
          <ReactTooltip id="items" {...tooltipConfig} />
        </StyledNavLink>
        <StyledNavLink to="/history" activeStyle={activeStyle} exact>
          <Icon
            className="material-icons-round"
            data-tip="History"
            data-for="history"
          >
            refresh
          </Icon>
          <ReactTooltip id="history" {...tooltipConfig} />
        </StyledNavLink>
        <StyledNavLink to="/statistics" activeStyle={activeStyle} exact>
          <Icon
            className="material-icons-round"
            data-tip="Statistics"
            data-for="statistics"
          >
            insert_chart_outlined
          </Icon>
          <ReactTooltip id="statistics" {...tooltipConfig} />
        </StyledNavLink>
      </IconsWrapper>
      <CartItem />
    </StyledNavBar>
  );
}

export default NavBar;
