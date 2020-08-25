import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Axios from 'axios';

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  Axios.defaults.baseURL = 'http://localhost:5000/api/v1';
} else {
  Axios.defaults.baseURL = '/api/v1';
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
