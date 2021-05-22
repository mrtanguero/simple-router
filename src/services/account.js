import { apiExample } from '../services/apiExample.js';

export const login = (data) => {
  return apiExample.post('/authenticate', {
    username: data.username,
    password: data.password,
    rememberMe: true,
  });
};

export const getAccount = () => {
  return apiExample.get('/account', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  });
};
