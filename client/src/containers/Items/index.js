import PropTypes from 'prop-types';
import React from 'react';
import Title from '../../components/Title';
import SearchBar from '../../components/UI/SearchBar';
import { useEffect } from 'react';
import ItemsGroup from '../../components/ItemsGroup';
import { getItemsData } from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import { Text, StyledItems, Header } from './styles';

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
