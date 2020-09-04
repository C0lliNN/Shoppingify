import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Title from '../../components/Title/Title';
import SearchBar from '../../components/UI/SearchBar/SearchBar';
import { useEffect } from 'react';
import ItemsGroup from '../../components/ItemsGroup/ItemsGroup';
import * as variables from '../../helpers/style-constants';
import { getItemsData } from '../../store/actions';
import { connect } from 'react-redux';

const StyledItems = styled.div`
  padding: 20px;
  box-sizing: border-box;
  min-height: 100%;
  background-color: #fafafe;
  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    padding: 20px 60px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: top;
  justify-content: start;
  flex-wrap: wrap;
  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    flex-wrap: nowrap;
    justify-content: space-around;
  }
`;

function Items({ getItemsData, data }) {
  useEffect(() => {
    getItemsData();
  }, [getItemsData]);

  return (
    <StyledItems>
      <Header>
        <Title />
        <SearchBar />
      </Header>
      {data.map((group) => (
        <ItemsGroup key={group.category._id} {...group} />
      ))}
    </StyledItems>
  );
}

Items.propTypes = {
  data: PropTypes.array,
  getItemsData: PropTypes.func,
};

const mapDispatchToProps = {
  getItemsData,
};

const mapStateToProps = (state) => {
  return {
    data: state.itemsData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
