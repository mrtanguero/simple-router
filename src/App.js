import React, { useEffect, useState, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import 'react-toastify/dist/ReactToastify.min.css';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MainNavigation from './layout/MainNavigation/MainNavigation';

import LoginPage from './pages/LoginPage/LoginPage';
import Logout from './components/Logout/Logout';

import Page404 from './pages/Page404/Page404';
import Footer from './layout/Footer/Footer/Footer';
import RegisterForm from './components/RegisterForm/RegisterForm';
import CenteredSpinner from './components/CenteredSpinner/CenteredSpinner';

const MoviesPage = React.lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieForm = React.lazy(() => import('./components/MovieForm/MovieForm'));

const BooksPage = React.lazy(() => import('./pages/BooksPage/BooksPage'));
const BookForm = React.lazy(() => import('./components/BookForm/BookForm'));

const PeoplePage = React.lazy(() => import('./pages/PeoplePage/PeoplePage'));
const PersonForm = React.lazy(() =>
  import('./components/PersonForm/PersonForm')
);

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
            <Suspense fallback={<CenteredSpinner />}>
              <MoviesPage setMessage={setMessage} />
            </Suspense>
          </ProtectedRoute>
          <ProtectedRoute jwtToken={jwtToken} path="/movies/:movieId">
            <Suspense fallback={<CenteredSpinner />}>
              <MovieForm setMessage={setMessage} />
            </Suspense>
          </ProtectedRoute>

          <ProtectedRoute jwtToken={jwtToken} path="/books" exact>
            <Suspense fallback={<CenteredSpinner />}>
              <BooksPage setMessage={setMessage} />
            </Suspense>
          </ProtectedRoute>
          <ProtectedRoute jwtToken={jwtToken} path="/books/:bookId">
            <Suspense fallback={<CenteredSpinner />}>
              <BookForm setMessage={setMessage} />
            </Suspense>
          </ProtectedRoute>

          <ProtectedRoute jwtToken={jwtToken} path="/people" exact>
            <Suspense fallback={<CenteredSpinner />}>
              <PeoplePage setMessage={setMessage} />
            </Suspense>
          </ProtectedRoute>
          <ProtectedRoute jwtToken={jwtToken} path="/people/:personId">
            <Suspense fallback={<CenteredSpinner />}>
              <PersonForm setMessage={setMessage} />
            </Suspense>
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
