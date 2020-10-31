import axios from 'axios';

const baseURL =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api/v1'
    : '/api/v1';

export default axios.create({
  baseURL,
});
