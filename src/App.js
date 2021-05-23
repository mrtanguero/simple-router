import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';

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
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (message) {
      toast.success(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    return () => setMessage(null);
  });
  return (
    <QueryClientProvider client={queryClient}>
      <MainNavigation jwtToken={jwtToken} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Container className="mt-4 flex-grow-1">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/movies" />
          </Route>

          <ProtectedRoute jwtToken={jwtToken} path="/movies" exact>
            <MoviesPage setMessage={setMessage} />
          </ProtectedRoute>
          <ProtectedRoute jwtToken={jwtToken} path="/movies/:movieId">
            <MovieForm setMessage={setMessage} />
          </ProtectedRoute>

          <ProtectedRoute jwtToken={jwtToken} path="/books" exact>
            <BooksPage setMessage={setMessage} />
          </ProtectedRoute>
          <ProtectedRoute jwtToken={jwtToken} path="/books/:bookId">
            <BookForm setMessage={setMessage} />
          </ProtectedRoute>

          <ProtectedRoute jwtToken={jwtToken} path="/people" exact>
            <PeoplePage setMessage={setMessage} />
          </ProtectedRoute>
          <ProtectedRoute jwtToken={jwtToken} path="/people/:personId">
            <PersonForm setMessage={setMessage} />
          </ProtectedRoute>

          <Route path="/login">
            <LoginPage setJwtToken={setJwtToken} />
          </Route>
          <Route path="/register">
            <RegisterForm setMessage={setMessage} />
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
    </QueryClientProvider>
  );
}

export default App;
