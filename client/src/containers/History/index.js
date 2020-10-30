import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/UI/Spinner/Spinner';
import getAxios from '../../helpers/axios';
import { List, ListsContainer, Title, Container, Badge, NoItems } from './styles';

export default function History() {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const history = useHistory();

  async function fetchLists() {
    try {
      const { data } = await getAxios().get('/lists');
      const transformedData = data.map((list) => {
        const formattedDate = moment(list.updated).format('MMM DD.M.YYYY');

        return {
          _id: list._id,
          name: list.name,
          date: formattedDate,
          status: list.status,
        };
      });

      setLists(transformedData);
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.message
        : err.message;
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  function handleShowListDetails(id) {
    history.push(`/history/${id}`);
  }

  useEffect(() => {
    fetchLists();
  }, []);

  let content = null;

  if (isLoading) {
    content = <Spinner />;
  } else if (error) {
    content = <ErrorMessage message={error} />;
  } else if (lists.length) {
    content = (
      <ListsContainer>
        {lists.map((list) => (
          <List key={list._id}>
            <h3>{list.name}</h3>
            <div>
              <div className="date">
                <span className="material-icons-round icon">event_note</span>
                <span>{list.date}</span>
                <Badge canceled={list.status === 'canceled'}>
                  {list.status}
                </Badge>
                <button
                  className="right"
                  onClick={() => handleShowListDetails(list._id)}
                >
                  <span className="material-icons-round">
                    arrow_forward_ios
                  </span>
                </button>
              </div>
            </div>
          </List>
        ))}
      </ListsContainer>
    );
  } else {
    content = <NoItems>No Items Yet</NoItems>
  }

  return (
    <Container>
      <Title>Shopping History</Title>
      {content}
    </Container>
  );
}
