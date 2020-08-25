import React from 'react';
import Todos from '../../components/Todos/Todos';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import styles from './Todos.module.css';
import { useHistory } from 'react-router';

export default function TodosContainer() {
  const history = useHistory();

  function handleNewClick() {
    history.push('/create');
  }

  return (
    <div className={styles.Todos}>
      <Card>
        <Card.Header>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h2>Todos</h2>
            <Button type="success" onClick={handleNewClick}>
              New
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Todos />
        </Card.Body>
      </Card>
    </div>
  );
}
