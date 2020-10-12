import PropTypes from 'prop-types';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import { showListBuilder } from '../../../store/actions';
import { connect } from 'react-redux';
import { CartIconWrapper, Badge, IconWrapper, Icon } from './styles';

function CartIcon({ showListBuilder }) {
  return (
    <CartIconWrapper>
      <Badge>3</Badge>
      <IconWrapper
        data-tip="Shopping Cart"
        data-for="cartIcon"
        data-testid="icon"
        onClick={showListBuilder}
      >
        <Icon className="material-icons-outlined">shopping_cart</Icon>
      </IconWrapper>
      <ReactTooltip
        place="right"
        type="dark"
        id="cartIcon"
        effect="solid"
        delayShow={500}
      />
    </CartIconWrapper>
  );
}

CartIcon.propTypes = {
  showListBuilder: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  showListBuilder,
};

export default connect(null, mapDispatchToProps)(CartIcon);
