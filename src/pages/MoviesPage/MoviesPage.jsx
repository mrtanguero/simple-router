import React from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import MovieCard from '../../components/MovieCard/MovieCard';

export default function MoviesPage({ movies, setMovies }) {
  const history = useHistory();

  const onAddNewMovieButonHandler = () => {
    history.push('/movies/new');
  };

  const deleteMovie = (id) => {
    const newMovies = _.cloneDeep(movies).filter((movie) => movie.id !== id);
    setMovies(newMovies);
  };

  const moviesList = movies.map((movie) => (
    <Col s={12} md={6} xl={4} key={movie.id}>
      <MovieCard {...movie} deleteMovie={deleteMovie} />
    </Col>
  ));
  return (
    <div>
      <h2 className="text-center mb-4">Filmovi</h2>
      <Container>
        <Row className="g-3">{moviesList}</Row>
        <Button
          onClick={onAddNewMovieButonHandler}
          variant="danger"
          style={{
            position: 'fixed',
            bottom: '3rem',
            right: '4rem',
            boxShadow: '0 3px 6px rgba(0, 0, 0, .4)',
          }}
        >
          + Dodaj novi film
        </Button>
      </Container>
    </div>
  );
}
