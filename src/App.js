import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './App.css';

import { MOVIES } from './dummy_data/movies';
import { BOOKS } from './dummy_data/books';
import { PEOPLE } from './dummy_data/people';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MainNavigation from './layout/MainNavigation/MainNavigation';
import BooksPage from './pages/BooksPage/BooksPage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import PeoplePage from './pages/PeoplePage/PeoplePage';
import LoginPage from './pages/LoginPage/LoginPage';
import Logout from './components/Logout/Logout';
import EditMoviePage from './pages/EditMoviePage/EditMoviePage';
import NewMoviePage from './pages/NewMoviePage/NewMoviePage';
import EditBookPage from './pages/EditBookPage/EditBookPage';
import NewBookPage from './pages/NewBookPage/NewBoogPage';
import EditPersonPage from './pages/EditPersonPage/EditPersonPage';
import NewPersonPage from './pages/NewPersonPage/NewPersonPage';
import Page404 from './pages/Page404/Page404';
import Footer from './layout/Footer/Footer/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn')
      ? JSON.parse(localStorage.getItem('isLoggedIn'))
      : false
  );
  const [movies, setMovies] = useState(
    localStorage.getItem('movies')
      ? JSON.parse(localStorage.getItem('movies'))
      : MOVIES || []
  );
  const [books, setBooks] = useState(
    localStorage.getItem('books')
      ? JSON.parse(localStorage.getItem('books'))
      : BOOKS || []
  );
  const [people, setPeople] = useState(
    localStorage.getItem('people')
      ? JSON.parse(localStorage.getItem('people'))
      : PEOPLE || []
  );

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('people', JSON.stringify(people));
  }, [people]);

  return (
    <>
      <MainNavigation isLoggedIn={isLoggedIn} />
      <Container className="mt-4 flex-grow-1">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/movies" />
          </Route>
          <ProtectedRoute isLoggedIn={isLoggedIn} path="/movies" exact>
            <MoviesPage movies={movies} setMovies={setMovies} />
          </ProtectedRoute>
          <ProtectedRoute isLoggedIn={isLoggedIn} path="/movies/new">
            <NewMoviePage movies={movies} setMovies={setMovies} />
          </ProtectedRoute>
          <ProtectedRoute isLoggedIn={isLoggedIn} path="/movies/:movieId">
            <EditMoviePage movies={movies} setMovies={setMovies} />
          </ProtectedRoute>
          <ProtectedRoute isLoggedIn={isLoggedIn} path="/books" exact>
            <BooksPage books={books} setBooks={setBooks} />
          </ProtectedRoute>
          <ProtectedRoute isLoggedIn={isLoggedIn} path="/books/new">
            <NewBookPage books={books} setBooks={setBooks} />
          </ProtectedRoute>
          <ProtectedRoute isLoggedIn={isLoggedIn} path="/books/:bookId">
            <EditBookPage books={books} setBooks={setBooks} />
          </ProtectedRoute>
          <ProtectedRoute isLoggedIn={isLoggedIn} path="/people" exact>
            <PeoplePage people={people} setPeople={setPeople} />
          </ProtectedRoute>
          <ProtectedRoute isLoggedIn={isLoggedIn} path="/people/new">
            <NewPersonPage people={people} setPeople={setPeople} />
          </ProtectedRoute>
          <ProtectedRoute isLoggedIn={isLoggedIn} path="/people/:personId">
            <EditPersonPage people={people} setPeople={setPeople} />
          </ProtectedRoute>
          <Route path="/login">
            <LoginPage setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/logout">
            <Logout setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </Container>
      <Footer />
    </>
  );
}

export default App;
