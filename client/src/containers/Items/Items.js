import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Title from '../../components/Title';
import SearchBar from '../../components/UI/SearchBar/SearchBar';
import { useEffect } from 'react';
import ItemsGroup from '../../components/ItemsGroup';
import * as variables from '../../helpers/style-constants';
import { getItemsData } from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage';

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

const Text = styled.p`
  font-size: ${variables.FONT_SIZE_3};
  font-family: ${variables.FONT_FAMILY};
  font-weight: 600;
  margin-top: 50px;
`;

function Items({ getItemsData, data, isLoading, error }) {
  useEffect(() => {
    getItemsData();
  }, [getItemsData]);

  let content = null;

  if (isLoading) {
    content = <Spinner />;
  } else if (error) {
    content = <ErrorMessage message={error} />;
  } else if (data.length) {
    content = data
      .filter((group) => group.category._id)
      .map((group) => <ItemsGroup key={group.category._id} {...group} />);
  } else {
    content = <Text>No items yet</Text>;
  }

  return (
    <StyledItems>
      <Header>
        <Title />
        <SearchBar />
      </Header>
      {content}
    </StyledItems>
  );
}

Items.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  data: PropTypes.array,
  getItemsData: PropTypes.func,
};

const mapDispatchToProps = {
  getItemsData,
};

const mapStateToProps = (state) => {
  return {
    ...state.itemsData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
