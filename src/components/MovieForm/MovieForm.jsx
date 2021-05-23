import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { createMovie, getMovie, updateMovie } from '../../services/movies.js';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default function MovieForm() {
  const { movieId } = useParams();
  const history = useHistory();

  const { data: response } = useQuery(['movie', movieId], () => {
    return movieId !== 'new' && getMovie(movieId);
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: response?.data,
  });

  useEffect(() => {
    if (!response) return;
    reset(response.data);
  }, [response, reset]);

  const mutationCreate = useMutation((newMovie) => createMovie(newMovie), {
    onSuccess: () => history.replace('/movies'),
  });
  const mutationUpdate = useMutation((newMovie) => updateMovie(newMovie), {
    onSuccess: () => history.replace('/movies'),
  });

  const onSubmitHandler = (data) => {
    if (movieId !== 'new') {
      mutationUpdate.mutate(data);
    } else {
      mutationCreate.mutate(data);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <h2 className="text-center mb-4">
        {movieId === 'new' ? 'Dodaj film' : 'Izmijeni film'}
      </h2>
      <Container>
        <Form.Group className="mb-4" controlId="movieName">
          <Form.Label>Naziv filma</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite naziv filma..."
            {...register('name', { required: 'Polje je obavezno' })}
          />
          <small className="invalid-field">{errors.name?.message}</small>
        </Form.Group>

        <Form.Group className="mb-4" controlId="movieDuration">
          <Form.Label>Tranjanje filma (min)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Unesite trajanje filma..."
            {...register('duration', { required: 'Polje je obavezno' })}
          />
          <small className="invalid-field">{errors.duration?.message}</small>
        </Form.Group>

        <Form.Group className="mb-4" controlId="movieWriter">
          <Form.Label>Scenario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite scenaristu/scenaristkinju..."
            {...register('writerName', { required: 'Polje je obavezno' })}
          />
          <small className="invalid-field">{errors.writerName?.message}</small>
        </Form.Group>

        <Form.Group className="mb-4" controlId="movieDirector">
          <Form.Label>Režija</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite ime režisera/režiserke..."
            {...register('directorName', { required: 'Polje je obavezno' })}
          />
          <small className="invalid-field">
            {errors.directorName?.message}
          </small>
        </Form.Group>

        <Form.Group className="mb-4" controlId="movieRating">
          <Form.Label>Ocjena (1-5)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Unesite ocjenu..."
            {...register('rating', {
              required: 'Polje je obavezno',
              min: {
                value: 1,
                message: 'Ocjena mora biti između 1 i 5',
              },
              max: {
                value: 5,
                message: 'Ocjena mora biti između 1 i 5',
              },
            })}
          />
          <small className="invalid-field">{errors.rating?.message}</small>
        </Form.Group>

        <Button variant="outline-primary" type="submit" className="mb-4 w-100">
          {movieId === 'new' ? 'Dodaj film' : 'Snimi izmjene'}
        </Button>
      </Container>
    </Form>
  );
}
