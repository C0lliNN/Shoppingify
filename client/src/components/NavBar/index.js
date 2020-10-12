import React from 'react';
import { Link } from 'react-router-dom';
import * as variables from '../../helpers/style-constants';
import logo from '../../assets/images/logo.svg';
import CartItem from './CartIcon';
import ReactTooltip from 'react-tooltip';
import { StyledNavBar, IconsWrapper, StyledNavLink, Icon } from './styles';

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
        <StyledNavLink to="/logout" exact>
          <Icon
            className="material-icons-round"
            data-tip="Logout"
            data-for="logout"
          >
            power_settings_new
          </Icon>
          <ReactTooltip id="logout" {...tooltipConfig} />
        </StyledNavLink>
      </IconsWrapper>
      <CartItem />
    </StyledNavBar>
  );
}

export default NavBar;
