import { apiExample } from '../services/apiExample';

export const getPeople = (query) => {
  return apiExample.get('/people', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
    params: {
      page: query.get('page'),
    },
  });
};

export const deletePerson = (id) => {
  return apiExample.delete(`/people/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  });
};

export const getPerson = (id) => {
  return apiExample.get(`/people/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  });
};

export const createPerson = (data) => {
  return apiExample.post(`/people`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  });
};

export const updatePerson = (data) => {
  return apiExample.put(`/people`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  });
};
