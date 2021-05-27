import { apiExample } from '../services/apiExample.js';

export const login = (data) => {
  return apiExample.post('/authenticate', {
    username: data.username,
    password: data.password,
    rememberMe: true,
  });
};

export const registerAccount = (data) => {
  return apiExample.post('/register', {
    login: data.login,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    authorities: ['ROLE_USER'],
    langKey: 'en',
  });
};

export const getAccount = () => {
  return apiExample.get('/account', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  });
};
