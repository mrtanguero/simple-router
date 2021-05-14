import { apiExample } from '../services/apiExample.js';

export const login = (data) => {
  return apiExample.post('/authenticate', {
    username: data.username,
    password: data.password,
    rememberMe: true,
  });
};
