import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { apiExample } from '../../api/apiExample';

export default function MovieForm() {
  const { movieId } = useParams();
  const history = useHistory();

  const [movieName, setMovieName] = useState('');
  const [movieDirector, setMovieDirector] = useState('');
  const [movieDuration, setMovieDuration] = useState('');
  const [movieWriter, setMovieWriter] = useState('');
  const [movieRating, setMovieRating] = useState('');

  useEffect(() => {
    if (movieId === 'new') return;
    apiExample
      .get(`/movies/${movieId}`)
      .then((response) => {
        setMovieName(response.data.name);
        setMovieDirector(response.data.directorName);
        setMovieDuration(response.data.duration);
        setMovieWriter(response.data.writerName);
        setMovieRating(response.data.rating);
      })
      .catch((err) => console.log(err));
  }, [movieId]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newMovie = {
      name: movieName,
      duration: movieDuration,
      directorName: movieDirector,
      writerName: movieWriter,
      rating: movieRating,
    };
    if (movieId !== 'new') {
      newMovie.id = +movieId;
      apiExample
        .put(`/movies`, newMovie)
        .then(() => history.replace('/movies'))
        .catch((err) => console.log(err));
    } else {
      apiExample
        .post('/movies', newMovie)
        .then(() => history.replace('/movies'))
        .catch((err) => console.log(err));
    }
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <h2 className="text-center mb-4">
        {movieId === 'new' ? 'Dodaj film' : 'Izmijeni film'}
      </h2>
      <Container>
        <Form.Group className="mb-4" controlId="movieName">
          <Form.Label>Naziv filma</Form.Label>
          <Form.Control
            type="text"
            value={movieName}
            placeholder="Unesite ime filma..."
            onChange={(e) => setMovieName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="movieDuration">
          <Form.Label>Tranjanje filma (min)</Form.Label>
          <Form.Control
            type="number"
            value={movieDuration}
            placeholder="Unesite trajanje filma..."
            onChange={(e) => setMovieDuration(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="movieWriter">
          <Form.Label>Scenario</Form.Label>
          <Form.Control
            type="text"
            value={movieWriter}
            placeholder="Unesite scenaristu/scenaristkinju..."
            onChange={(e) => setMovieWriter(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="movieDirector">
          <Form.Label>Režija</Form.Label>
          <Form.Control
            type="text"
            value={movieDirector}
            placeholder="Unesite ime režisera/režiserke..."
            onChange={(e) => setMovieDirector(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="movieRating">
          <Form.Label>Ocjena (1-5)</Form.Label>
          <Form.Control
            type="number"
            from="1"
            to="5"
            value={movieRating}
            placeholder="Unesite ocjenu..."
            onChange={(e) => setMovieRating(e.target.value)}
          />
        </Form.Group>

        <Button variant="outline-primary" type="submit" className="mb-4 w-100">
          {movieId === 'new' ? 'Dodaj film' : 'Snimi izmjene'}
        </Button>
      </Container>
    </Form>
  );
}
