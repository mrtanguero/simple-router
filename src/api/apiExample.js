import axios from 'axios';

export const apiExample = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
  },
});
