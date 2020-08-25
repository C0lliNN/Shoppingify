import React, { useRef, useState } from 'react';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Spinner from '../../components/Spinner/Spinner';
import styles from './Form.module.css';
import Axios from 'axios';
import tingle from 'tingle.js';
import { useHistory } from 'react-router';

export default function Form() {
  const titleRef = useRef();
  const descriptionRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const history = useHistory();

  async function handleTodoCreation(event) {
    event.preventDefault();

    const payload = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
    };

    setIsLoading(true);

    try {
      await Axios.post('/todos', payload);
      const modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
      });
      modal.setContent(`
          <h1>Success!</h1>
          <p>Your todo was created successfully and it is available in your list.</p>
        `);
      modal.addFooterBtn(
        'OK!',
        'tingle-btn tingle-btn--pull-right tingle-btn--primary',
        () => modal.close()
      );
      modal.open();
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleTodosClick() {
    history.push('/');
  }

  let content = null;

  if (isLoading) {
    content = <Spinner />;
  } else if (error) {
    content = <p>{error.message}</p>;
  }

  return (
    <Card>
      <Card.Header>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2>New Todo</h2>
          <Button type="primary" onClick={handleTodosClick}>
            Todos
          </Button>
        </div>
      </Card.Header>
      <form onSubmit={handleTodoCreation}>
        <Card.Body>
          <div className={styles.FormGroup}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" ref={titleRef} />
          </div>
          <div className={styles.FormGroup}>
            <label htmlFor="description">Description</label>
            <textarea id="description" rows="3" ref={descriptionRef}></textarea>
          </div>
          {content}
        </Card.Body>
        <Card.Footer>
          <Button type="success">Create</Button>
        </Card.Footer>
      </form>
    </Card>
  );
}
