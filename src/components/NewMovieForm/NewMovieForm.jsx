import React, { useState } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function NewMovieForm({ movies, setMovies }) {
  const history = useHistory();

  const [movieTitle, setMovieTitle] = useState('');
  const [movieYear, setMovieYear] = useState('');
  const [movieGenre, setMovieGenre] = useState('');
  const [movieDirector, setMovieDirector] = useState('');
  const [movieActors, setMovieActors] = useState('');
  const [movieImageUrl, setMovieImageUrl] = useState(
    'https://via.placeholder.com/300x450?text=Vaša+slika+će+ići+ovdje'
  );

  const getNewId = () => {
    return (
      movies.reduce(
        (max, current) => (current.id > max ? current.id : max),
        0
      ) + 1
    );
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let newMovies = _.cloneDeep(movies);
    newMovies = [
      {
        id: getNewId(),
        title: movieTitle,
        year: movieYear,
        genre: movieGenre,
        director: movieDirector,
        actors: movieActors,
        imageUrl: movieImageUrl,
      },
      ...newMovies,
    ];
    setMovies(newMovies);
    history.replace('/movies');
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <Container>
        <Row>
          <Col md={7}>
            <div className="form-fields-container pe-5 ps-5">
              <Form.Group className="mb-4" controlId="movieName">
                <Form.Label>Naziv filma</Form.Label>
                <Form.Control
                  type="text"
                  value={movieTitle}
                  placeholder="Unesite ime filma..."
                  onChange={(e) => setMovieTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="movieYear">
                <Form.Label>Godina izdavanja</Form.Label>
                <Form.Control
                  type="number"
                  from={1900}
                  to={2021}
                  value={movieYear}
                  placeholder="Unesite godinu izdavanja..."
                  onChange={(e) => setMovieYear(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="moveGenre">
                <Form.Label>Žanr</Form.Label>
                <Form.Control
                  type="text"
                  value={movieGenre}
                  placeholder="Unesite žanr..."
                  onChange={(e) => setMovieGenre(e.target.value)}
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

              <Form.Group className="mb-4" controlId="moveActors">
                <Form.Label>Glumci</Form.Label>
                <Form.Control
                  type="text"
                  value={movieActors}
                  placeholder="Unesite listu glumaca..."
                  onChange={(e) => setMovieActors(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="moveImageUrl">
                <Form.Label>URL fotografije</Form.Label>
                <Form.Control
                  type="url"
                  value={movieImageUrl}
                  onChange={(e) => setMovieImageUrl(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="outline-primary"
                type="submit"
                className="mb-4 w-100"
              >
                Dodaj film
              </Button>
            </div>
          </Col>
          <Col md={5}>
            <div className="image-container mb-4">
              <img
                src={movieImageUrl}
                alt={movieTitle}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}
