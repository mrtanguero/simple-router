import React, { useState } from 'react';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import { useQueryParamPage } from '../../hooks/useQueryParamPage';
import { deleteBook, getBooks } from '../../services/books';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

import EditIcon from '../../components/EditIcon/EditIcon';
import DeleteIcon from '../../components/DeleteIcon/DeleteIcon';
import MyPagination from '../../components/MyPagination/MyPagination';
import Spinner from 'react-bootstrap/Spinner';

export default function BooksPage({ setMessage }) {
  const history = useHistory();
  const pageNumber = useQueryParamPage();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const queryClient = useQueryClient();
  const mutation = useMutation((id) => deleteBook(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('books');
      setMessage('Knjiga je uspješno izbrisana.');
    },
  });

  const {
    data: response,
    isLoading,
    error,
  } = useQuery(['books', pageNumber], () => getBooks(pageNumber), {
    keepPreviousData: true,
  });

  if (error) console.log(error);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (id) => {
    setModalData({
      id: id,
      bookName: response.data.find((book) => book.id === id).isbn,
    });
    setShowModal(true);
  };

  const onAddNewBookButonHandler = () => {
    history.push('/books/new');
  };

  const handleConfirmDelete = (id) => {
    mutation.mutate(id);
    handleCloseModal();
  };

  const headers = ['Naziv', 'Pisac', 'Žanr', 'Datum izdavanja', 'Izdavač', ''];
  return (
    <div>
      <h2 className="text-center mb-4">
        Knjige {isLoading && <Spinner animation="border" variant="info" />}
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
            {response?.data.map((book) => (
              <tr className="align-middle" key={book.id}>
                <td>{book.isbn}</td>
                <td>{book.writerName}</td>
                <td>{book.genre}</td>
                <td>{book.publishedDate}</td>
                <td>{book.publisherName}</td>
                <td>
                  <div className="d-flex">
                    <Link
                      to={`/books/${book.id}`}
                      className="btn btn-primary me-1"
                    >
                      <EditIcon />
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => handleShowModal(book.id)}
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
          onClick={onAddNewBookButonHandler}
          variant="danger"
          style={{
            position: 'fixed',
            bottom: '3rem',
            right: '4rem',
            boxShadow: '0 3px 6px rgba(0, 0, 0, .4)',
          }}
        >
          + Dodaj novu knjigu
        </Button>
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header>
            <Modal.Title>UPOZORENJE:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Da li stvarno želite da obrišete knjigu{' '}
            <strong>{modalData.bookName}</strong>?
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
