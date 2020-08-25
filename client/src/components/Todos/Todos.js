import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import styles from './Todos.module.css';
import Spinner from '../Spinner/Spinner';
import Todo from './Todo/Todo';

export default function Todos() {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function getTodos() {
      setIsLoading(true);

      try {
        const response = await Axios.get('todos');
        setTodos(response.data);
      } catch (error) {
        console.error(error.message);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  let content = null;

  if (isLoading) {
    content = <Spinner />;
  } else if (todos) {
    content = (
      <ul className={styles.Todos}>
        {todos.map((todo) => (
          <Todo key={todo._id} todo={todo} />
        ))}
      </ul>
    );
  } else if (error) {
    content = <p>Error: {error.message}</p>;
  }

  return content;
}
