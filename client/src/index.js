import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Axios from 'axios';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from './store/reducers/auth';
import infoBarReducer from './store/reducers/info-bar';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  Axios.defaults.baseURL = 'http://localhost:5000/api/v1';
} else {
  Axios.defaults.baseURL = '/api/v1';
}

const rootReducer = combineReducers({
  auth: authReducer,
  infoBar: infoBarReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
