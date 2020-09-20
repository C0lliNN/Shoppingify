import axios from 'axios';
import store from '../store/index';

export default function getAxios() {
  const config = {
    headers: {},
  };
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'development') {
    config.baseURL = 'http://localhost:5000/api/v1';
  } else {
    config.baseURL = '/api/v1';
  }

  config.headers['Content-Type'] = 'application/json';

  const token = store.getState().auth.token;

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return axios.create(config);
}
