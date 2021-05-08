import React from 'react';
import EditMovieForm from '../../components/EditMovieForm/EditMovieForm';

export default function EditMoviePage({ movies, setMovies }) {
  return (
    <>
      <h2 className="text-center mb-4">Izmijeni film</h2>
      <EditMovieForm movies={movies} setMovies={setMovies} />
    </>
  );
}
