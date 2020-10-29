import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import BackButton from '../../components/BackButton';
import { ListName, Container } from './styles';
import Spinner from '../../components/UI/Spinner/Spinner';
import getAxios from '../../helpers/axios';
import ErrorMessage from '../../components/ErrorMessage';
import ItemsGroup from '../../components/ItemsGroup';

export default function List() {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();
  const [error, setError] = useState();

  const match = useRouteMatch();
  const history = useHistory();

  function handleBack() {
    history.goBack();
  }

  async function getList(id) {
    try {
      const { data } = await getAxios().get(`/lists/${id}`);
      setList(data);
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.message
        : err.message;
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getList(match.params.id);
  }, [match.params]);

  let content = null;

  if (isLoading) {
    content = <Spinner />;
  } else if (list) {
    let lastItem = null;

    const itemsGroupData = [];

    for (const item of list.items) {
      if (!lastItem || lastItem.category._id !== item.category._id) {
        itemsGroupData.push({
          category: item.category,
          items: [item],
        });
      } else {
        const lastIndex = itemsGroupData.length - 1;
        itemsGroupData[lastIndex].items.push(item);
      }

      lastItem = item;
    }

    content = (
      <Container>
        <BackButton onClick={handleBack} />
        <ListName>{list.name}</ListName>
        {itemsGroupData.map((group) => (
          <ItemsGroup
            key={group.category._id}
            category={group.category}
            items={group.items}
          />
        ))}
      </Container>
    );
  } else if (error) {
    content = <ErrorMessage message={error} />;
  }

  return content;
}
