import React from 'react';
import ReactTooltip from 'react-tooltip';
import { showListBuilder } from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { CartIconWrapper, Badge, IconWrapper, Icon } from './styles';

function CartIcon() {
  const dispatch = useDispatch();

  return (
    <CartIconWrapper>
      <Badge>3</Badge>
      <IconWrapper
        data-tip="Shopping Cart"
        data-for="cartIcon"
        data-testid="icon"
        onClick={() => dispatch(showListBuilder())}
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

export default CartIcon;
