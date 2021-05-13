import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { apiExample } from '../../api/apiExample';

export default function NewMovieForm({ movies, setMovies }) {
  const history = useHistory();

  const [movieName, setMovieName] = useState('');
  const [movieDirector, setMovieDirector] = useState('');
  const [movieDuration, setMovieDuration] = useState('');
  const [movieWriter, setMovieWriter] = useState('');
  const [movieRating, setMovieRating] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newMovie = {
      name: movieName,
      duration: movieDuration,
      directorName: movieDirector,
      writerName: movieWriter,
      rating: movieRating,
    };
    apiExample
      .post('/movies', newMovie)
      .then(() => history.replace('/movies'))
      .catch((err) => console.log(err));
  };

  return (
    <Form onSubmit={onSubmitHandler}>
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

        <Form.Group className="mb-4" controlId="moveWriter">
          <Form.Label>Scenario</Form.Label>
          <Form.Control
            type="text"
            value={movieWriter}
            placeholder="Unesite scenaristu/scenaristkinju..."
            onChange={(e) => setMovieWriter(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="moveDirector">
          <Form.Label>Režija</Form.Label>
          <Form.Control
            type="text"
            value={movieDirector}
            placeholder="Unesite ime režisera/režiserke..."
            onChange={(e) => setMovieDirector(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="moveRating">
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
          Dodaj film
        </Button>
      </Container>
    </Form>
  );
}
