import React from 'react';
import Title from '../../components/Title';
import SearchBar from '../../components/UI/SearchBar';
import { useEffect } from 'react';
import ItemsGroup from '../../components/ItemsGroup';
import { getItemsData } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import { Text, StyledItems, Header } from './styles';

function itemsReducer(items, group) {
  return items.concat(group.items.map((item) => item._id));
}

function Items() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.itemsData);
  const itemsAdded = useSelector((state) =>
    state.activeList.data.reduce(itemsReducer, [])
  );

  useEffect(() => {
    dispatch(getItemsData());
  }, [dispatch]);

  let content = null;

  if (isLoading) {
    content = <Spinner />;
  } else if (error) {
    content = <ErrorMessage message={error} />;
  } else if (data.length) {
    content = data
      .filter((group) => group.category._id)
      .map((group) => (
        <ItemsGroup
          key={group.category._id}
          category={group.category}
          items={group.items.filter((item) => !itemsAdded.includes(item._id))}
        />
      ));
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

export default Items;