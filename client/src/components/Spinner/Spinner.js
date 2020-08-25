import React from 'react';
import styles from './Spinner.module.css';

export default function Spinner() {
  return (
    <div className={styles.Spinner}>
      <div className={[styles.Cube, styles.Cube1].join(' ')}></div>
      <div className={[styles.Cube, styles.Cube2].join(' ')}></div>
      <div className={[styles.Cube, styles.Cube3].join(' ')}></div>
      <div className={[styles.Cube, styles.Cube4].join(' ')}></div>
    </div>
  );
}
