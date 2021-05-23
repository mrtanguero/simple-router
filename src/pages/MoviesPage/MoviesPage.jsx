import React, { useState } from 'react';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import { useQueryParamPage } from '../../hooks/useQueryParamPage.js';
import { getMovies, deleteMovie } from '../../services/movies.js';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

import EditIcon from '../../components/EditIcon/EditIcon';
import DeleteIcon from '../../components/DeleteIcon/DeleteIcon';
import MyPagination from '../../components/MyPagination/MyPagination';
import Spinner from 'react-bootstrap/Spinner';

export default function MoviesPage({ setMessage }) {
  const history = useHistory();
  const pageNumber = useQueryParamPage();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const queryClient = useQueryClient();
  const mutation = useMutation((id) => deleteMovie(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('movies');
      setMessage('Film je uspješno izbrisan.');
    },
  });

  const {
    data: response,
    isLoading,
    error,
  } = useQuery(['movies', pageNumber], () => getMovies(pageNumber), {
    keepPreviousData: true,
  });

  if (error) console.log(error);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (id) => {
    setModalData({
      id: id,
      movieName: response.data.find((movie) => movie.id === id).name,
    });
    setShowModal(true);
  };

  const onAddNewMovieButonHandler = () => {
    history.push('/movies/new');
  };

  const handleConfirmDelete = (id) => {
    mutation.mutate(id);
    handleCloseModal();
  };

  const headers = ['Naziv', 'Režija', 'Trajanje', 'Scenario', 'Ocjena', ''];
  return (
    <div>
      <h2 className="text-center mb-4">
        Filmovi {isLoading && <Spinner animation="border" variant="info" />}
      </h2>
      <Container className={response?.headers['x-total-count'] <= 20 && 'mb-5'}>
        <Table striped hover>
          <thead>
            <tr>
              {headers.map((head) => (
                <th key={head}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {response?.data.map((movie) => (
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
        <MyPagination rows={response?.headers['x-total-count']} />
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
