import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function header() {
  return (
    <header className={styles.Header}>
      <h1>
        <Link to="/" className={styles.Link}>
          Todos App
        </Link>
      </h1>
    </header>
  );
}
