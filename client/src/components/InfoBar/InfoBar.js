import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import * as variables from '../../helpers/style-constants';
import { connect } from 'react-redux';
import { SHOW_ITEM_DETAILS } from '../../store/actions/actionTypes';
import ItemDetails from './ItemDetails/ItemDetails';

const StyledInfoBar = styled.aside`
  height: 100%;
  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    position: fixed;
    width: ${variables.INFO_BAR_MD_SIZE}px;
    right: 0;
    top: 0;
  }
  @media (min-width: ${variables.LG_BREAK_POINT}px) {
    width: ${variables.INFO_BAR_LG_SIZE}px;
  }
`;

function InfoBar({ contentType, item }) {
  let content = null;

  if (contentType === SHOW_ITEM_DETAILS) {
    content = <ItemDetails item={item} />;
  } else {
    content = <div>InfoBar</div>;
  }

  return <StyledInfoBar>{content}</StyledInfoBar>;
}

InfoBar.propTypes = {
  contentType: PropTypes.any,
  item: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    contentType: state.infoBar.contentType,
    item: state.infoBar.item,
  };
};

export default connect(mapStateToProps)(InfoBar);
