import React from 'react';
import ReactTooltip from 'react-tooltip';
import { showListBuilder } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { CartIconWrapper, Badge, IconWrapper, Icon } from './styles';

function CartIcon() {
  const dispatch = useDispatch();

  const reducer = (total, group) => total + group.items.length;
  const filter = (item) => item.category.name;

  const count = useSelector((state) =>
    state.activeList.data.filter(filter).reduce(reducer, 0)
  );

  return (
    <CartIconWrapper>
      <Badge>{count}</Badge>
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
