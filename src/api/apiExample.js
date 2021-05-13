import axios from 'axios';

export const apiExample = axios.create({
  baseURL: 'http://127.0.1.1:8080/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
  },
});
