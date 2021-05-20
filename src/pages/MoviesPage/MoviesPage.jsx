import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Link, useHistory } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQueryParams.js';
import { getMovies, deleteMovie } from '../../services/movies.js';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

import EditIcon from '../../components/EditIcon/EditIcon';
import DeleteIcon from '../../components/DeleteIcon/DeleteIcon';
import MyPagination from '../../components/MyPagination/MyPagination';

export default function MoviesPage({ movies, setMovies }) {
  const history = useHistory();
  const query = useQueryParams();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [resourceCount, setResourceCount] = useState(0);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (id) => {
    setModalData({
      id: id,
      movieName: movies.find((movie) => movie.id === id).name,
    });
    setShowModal(true);
  };

  useEffect(() => {
    getMovies(query)
      .then((response) => {
        setMovies(response.data);
        setResourceCount(response.headers['x-total-count']);
      })
      .catch((err) => console.log(err));
  }, [setMovies, query]);

  const onAddNewMovieButonHandler = () => {
    history.push('/movies/new');
  };

  const handleDeleteMovie = (id) => {
    deleteMovie(id).then(() => {
      const newMovies = _.cloneDeep(movies).filter((movie) => movie.id !== id);
      setMovies(newMovies);
    });
  };

  const handleConfirmDelete = (id) => {
    handleDeleteMovie(id);
    setShowModal(false);
  };

  const headers = ['Naziv', 'Režija', 'Trajanje', 'Scenario', 'Ocjena', ''];
  return (
    <div>
      <h2 className="text-center mb-4">Filmovi</h2>
      <Container>
        <Table striped hover>
          <thead>
            <tr>
              {headers.map((head) => (
                <th key={head}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr className="align-middle" key={movie.id}>
                <td>{movie.name}</td>
                <td>{movie.directorName}</td>
                <td>{movie.duration}</td>
                <td>{movie.writerName}</td>
                <td>{movie.rating}</td>
                <td>
                  <div className="d-flex">
                    <Link
                      to={`/movies/${movie.id}`}
                      className="btn btn-primary me-1"
                    >
                      <EditIcon />
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => handleShowModal(movie.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <MyPagination rows={resourceCount} />
        <Button
          onClick={onAddNewMovieButonHandler}
          variant="danger"
          style={{
            position: 'fixed',
            bottom: '3rem',
            right: '4rem',
            boxShadow: '0 3px 6px rgba(0, 0, 0, .4)',
          }}
        >
          + Dodaj novi film
        </Button>
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header>
            <Modal.Title>UPOZORENJE:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Da li stvarno želite da obrišete film{' '}
            <strong>{modalData.movieName}</strong>?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Odustani
            </Button>
            <Button
              variant="danger"
              onClick={() => handleConfirmDelete(modalData.id)}
            >
              Obriši
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
