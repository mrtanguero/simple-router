import React from 'react';
import NewMovieForm from '../../components/NewMovieForm/NewMovieForm';

export default function NewMoviePage({ movies, setMovies }) {
  return (
    <>
      <h2 className="text-center mb-4">Dodaj novi film</h2>
      <NewMovieForm movies={movies} setMovies={setMovies} />
    </>
  );
}
