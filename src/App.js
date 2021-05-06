import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './App.css';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MainNavigation from './layout/MainNavigation/MainNavigation';
import BooksPage from './pages/BooksPage/BooksPage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import PeoplePage from './pages/PeoplePage/PeoplePage';
import LoginPage from './pages/LoginPage/LoginPage';
import Logout from './components/Logout/Logout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <MainNavigation isLoggedIn={isLoggedIn} />
      <Container className="mt-4">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/movies" />
          </Route>
          <ProtectedRoute isLoggedIn={isLoggedIn} path="/movies">
            <MoviesPage />
          </ProtectedRoute>
          <ProtectedRoute isLoggedIn={isLoggedIn} path="/books">
            <BooksPage />
          </ProtectedRoute>
          <ProtectedRoute isLoggedIn={isLoggedIn} path="/people">
            <PeoplePage />
          </ProtectedRoute>
          <Route path="/login">
            <LoginPage setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/logout">
            <Logout setIsLoggedIn={setIsLoggedIn} />
          </Route>
        </Switch>
      </Container>
    </>
  );
}

export default App;
