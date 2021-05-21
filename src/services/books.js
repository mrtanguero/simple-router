import { apiExample } from '../services/apiExample';

export const getBooks = (pageNumber) => {
  return apiExample.get('/books', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
    params: {
      page: pageNumber,
    },
  });
};

export const deleteBook = (id) => {
  return apiExample.delete(`/books/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  });
};

export const getBook = (id) => {
  return apiExample.get(`/books/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  });
};

export const createBook = (data) => {
  return apiExample.post(`/books`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  });
};

export const updateBook = (data) => {
  return apiExample.put(`/books`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    },
  });
};
