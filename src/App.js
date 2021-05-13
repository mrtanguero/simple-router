import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './App.css';

import { BOOKS } from './dummy_data/books';
import { PEOPLE } from './dummy_data/people';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MainNavigation from './layout/MainNavigation/MainNavigation';
import LoginPage from './pages/LoginPage/LoginPage';
import Logout from './components/Logout/Logout';
import MoviesPage from './pages/MoviesPage/MoviesPage';

import BooksPage from './pages/BooksPage/BooksPage';
import EditBookPage from './pages/EditBookPage/EditBookPage';
import NewBookPage from './pages/NewBookPage/NewBoogPage';
import PeoplePage from './pages/PeoplePage/PeoplePage';
import EditPersonPage from './pages/EditPersonPage/EditPersonPage';
import NewPersonPage from './pages/NewPersonPage/NewPersonPage';

import Page404 from './pages/Page404/Page404';
import Footer from './layout/Footer/Footer/Footer';
import MovieForm from './components/MovieForm/MovieForm';

function App() {
  const [jwtToken, setJwtToken] = useState(
    localStorage.getItem('jwtToken') ? localStorage.getItem('jwtToken') : ''
  );

  const [movies, setMovies] = useState([]);

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
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('people', JSON.stringify(people));
  }, [people]);

  return (
    <>
      <MainNavigation jwtToken={jwtToken} />
      <Container className="mt-4 flex-grow-1">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/movies" />
          </Route>
          <ProtectedRoute jwtToken={jwtToken} path="/movies" exact>
            <MoviesPage movies={movies} setMovies={setMovies} />
          </ProtectedRoute>
          <ProtectedRoute jwtToken={jwtToken} path="/movies/:movieId">
            <MovieForm movies={movies} setMovies={setMovies} />
          </ProtectedRoute>
          <ProtectedRoute jwtToken={jwtToken} path="/books" exact>
            <BooksPage books={books} setBooks={setBooks} />
          </ProtectedRoute>
          <ProtectedRoute jwtToken={jwtToken} path="/books/new">
            <NewBookPage books={books} setBooks={setBooks} />
          </ProtectedRoute>
          <ProtectedRoute jwtToken={jwtToken} path="/books/:bookId">
            <EditBookPage books={books} setBooks={setBooks} />
          </ProtectedRoute>
          <ProtectedRoute jwtToken={jwtToken} path="/people" exact>
            <PeoplePage people={people} setPeople={setPeople} />
          </ProtectedRoute>
          <ProtectedRoute jwtToken={jwtToken} path="/people/new">
            <NewPersonPage people={people} setPeople={setPeople} />
          </ProtectedRoute>
          <ProtectedRoute jwtToken={jwtToken} path="/people/:personId">
            <EditPersonPage people={people} setPeople={setPeople} />
          </ProtectedRoute>
          <Route path="/login">
            <LoginPage setJwtToken={setJwtToken} />
          </Route>
          <Route path="/logout">
            <Logout setJwtToken={setJwtToken} />
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
