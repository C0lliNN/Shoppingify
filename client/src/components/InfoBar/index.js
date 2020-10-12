import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  SHOW_ITEM_DETAILS,
  SHOW_CREATE_ITEM,
} from '../../store/actions/actionTypes';
import ItemDetails from './ItemDetails';
import ListBuilder from './ListBuilder/index.js';
import CreateItem from './CreateItem';
import { StyledInfoBar } from './styles';


function InfoBar({ contentType, item }) {
  let content = null;

  if (contentType === SHOW_ITEM_DETAILS) {
    content = <ItemDetails item={item} />;
  } else if (contentType === SHOW_CREATE_ITEM) {
    content = <CreateItem />;
  } else {
    content = <ListBuilder />;
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
