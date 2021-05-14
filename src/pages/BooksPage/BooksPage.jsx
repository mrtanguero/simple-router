import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Link, useHistory } from 'react-router-dom';
import { useQuery } from '../../hooks/useQuery';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

import { apiExample } from '../../api/apiExample';
import EditIcon from '../../components/EditIcon/EditIcon';
import DeleteIcon from '../../components/DeleteIcon/DeleteIcon';
import MyPagination from '../../components/MyPagination/MyPagination';

export default function BooksPage({ books, setBooks }) {
  const history = useHistory();
  const query = useQuery();

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [resourceCount, setResourceCount] = useState(0);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (id) => {
    setModalData({
      id: id,
      bookName: books.find((book) => book.id === id).isbn,
    });
    setShowModal(true);
  };

  useEffect(() => {
    apiExample
      .get('/books', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
        params: {
          page: query.get('page'),
        },
      })
      .then((response) => {
        setBooks(response.data);
        setResourceCount(response.headers['x-total-count']);
      })
      .catch((err) => console.log(err));
  }, [setBooks, query]);

  const onAddNewBookButonHandler = () => {
    history.push('/books/new');
  };

  const deleteBook = (id) => {
    apiExample.delete(`/books/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    });
    const newBooks = _.cloneDeep(books).filter((book) => book.id !== id);
    setBooks(newBooks);
  };

  const handleConfirmDelete = (id) => {
    deleteBook(id);
    setShowModal(false);
  };

  const headers = ['Naziv', 'Pisac', 'Žanr', 'Datum izdavanja', 'Izdavač', ''];
  return (
    <div>
      <h2 className="text-center mb-4">Knjige</h2>
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
            {books.map((book) => (
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
        <MyPagination rows={resourceCount} />

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
