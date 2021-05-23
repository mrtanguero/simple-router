import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Container from 'react-bootstrap/Container';
import './App.css';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MainNavigation from './layout/MainNavigation/MainNavigation';

import LoginPage from './pages/LoginPage/LoginPage';
import Logout from './components/Logout/Logout';

import MoviesPage from './pages/MoviesPage/MoviesPage';
import MovieForm from './components/MovieForm/MovieForm';

import BooksPage from './pages/BooksPage/BooksPage';
import BookForm from './components/BookForm/BookForm';

import PeoplePage from './pages/PeoplePage/PeoplePage';
import PersonForm from './components/PersonForm/PersonForm';

import Page404 from './pages/Page404/Page404';
import Footer from './layout/Footer/Footer/Footer';
import RegisterForm from './components/RegisterForm/RegisterForm';

const getJwtTokenFromLocaleStorage = () => {
  return localStorage.getItem('jwtToken')
    ? localStorage.getItem('jwtToken')
    : '';
};

const queryClient = new QueryClient();

function App() {
  const [jwtToken, setJwtToken] = useState(getJwtTokenFromLocaleStorage);

  // const [movies, setMovies] = useState([]);
  const [books, setBooks] = useState([]);
  const [people, setPeople] = useState([]);

  return (
    <QueryClientProvider client={queryClient}>
      <MainNavigation jwtToken={jwtToken} />
      <Container className="mt-4 flex-grow-1">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/movies" />
          </Route>
          <ProtectedRoute jwtToken={jwtToken} path="/movies" exact>
            <MoviesPage />
          </ProtectedRoute>
          <ProtectedRoute jwtToken={jwtToken} path="/movies/:movieId">
            <MovieForm />
          </ProtectedRoute>

          <ProtectedRoute jwtToken={jwtToken} path="/books" exact>
            <BooksPage books={books} setBooks={setBooks} />
          </ProtectedRoute>
          <ProtectedRoute jwtToken={jwtToken} path="/books/:bookId">
            <BookForm />
          </ProtectedRoute>

          <ProtectedRoute jwtToken={jwtToken} path="/people" exact>
            <PeoplePage people={people} setPeople={setPeople} />
          </ProtectedRoute>
          <ProtectedRoute jwtToken={jwtToken} path="/people/:personId">
            <PersonForm people={people} setPeople={setPeople} />
          </ProtectedRoute>

          <Route path="/login">
            <LoginPage setJwtToken={setJwtToken} />
          </Route>
          <Route path="/register">
            <RegisterForm />
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
