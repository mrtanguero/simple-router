import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';

export default function EditMovieForm({ movies, setMovies }) {
  const { movieId } = useParams();
  const history = useHistory();
  const movie = movies.filter((movie) => movie.id === +movieId)[0];

  const [movieTitle, setMovieTitle] = useState(movie.title);
  const [movieYear, setMovieYear] = useState(movie.year);
  const [movieGenre, setMovieGenre] = useState(movie.genre);
  const [movieDirector, setMovieDirector] = useState(movie.director);
  const [movieActors, setMovieActors] = useState(movie.actors);
  const [movieImageUrl, setMovieImageUrl] = useState(movie.imageUrl);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let newMovies = _.cloneDeep(movies).filter((mov) => mov.id !== movie.id);
    newMovies = [
      {
        id: +movieId,
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
    <Form className="w-75 d-flex m-auto" onSubmit={onSubmitHandler}>
      <div className="image-container" style={{ width: '40%' }}>
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
      <div className="form-fields-containerpe-5 ps-5" style={{ width: '60%' }}>
        <Form.Group className="mb-4" controlId="movieName">
          <Form.Label>Naziv filma</Form.Label>
          <Form.Control
            type="text"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="movieYear">
          <Form.Label>Godina izdavanja</Form.Label>
          <Form.Control
            type="number"
            from={1900}
            to={2021}
            value={+movieYear}
            onChange={(e) => setMovieYear(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="moveGenre">
          <Form.Label>Žanr</Form.Label>
          <Form.Control
            type="text"
            value={movieGenre}
            onChange={(e) => setMovieGenre(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="moveDirector">
          <Form.Label>Režija</Form.Label>
          <Form.Control
            type="text"
            value={movieDirector}
            onChange={(e) => setMovieDirector(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="moveActors">
          <Form.Label>Glumci</Form.Label>
          <Form.Control
            type="text"
            value={movieActors}
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

        <Button variant="outline-primary" type="submit">
          Snimi izmjene
        </Button>
      </div>
    </Form>
  );
}
