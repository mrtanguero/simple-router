import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import MainNavigation from './layout/MainNavigation/MainNavigation';
import BooksPage from './pages/BooksPage/BooksPage';

import MoviesPage from './pages/MoviesPage/MoviesPage';
import PeoplePage from './pages/PeoplePage/PeoplePage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <div className="App">
      <MainNavigation />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/movies" />
        </Route>
        <Route path="/movies">
          <MoviesPage />
        </Route>
        <Route path="/books">
          <BooksPage />
        </Route>
        <Route path="/people">
          <PeoplePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
