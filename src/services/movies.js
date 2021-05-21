import { apiExample } from '../services/apiExample';

export const getMovies = (page) => {
  return apiExample.get('/movies', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
    params: {
      page: page,
    },
  });
};

export const deleteMovie = (id) => {
  return apiExample.delete(`/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  });
};

export const getMovie = (id) => {
  return apiExample.get(`/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  });
};

export const createMovie = (data) => {
  return apiExample.post(`/movies`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  });
};

export const updateMovie = (data) => {
  return apiExample.put(`/movies`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  });
};
