import React from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import BookCard from '../../components/BookCard/BookCard';

export default function BooksPage({ books, setBooks }) {
  const history = useHistory();

  const onAddNewBookButonHandler = () => {
    history.push('/books/new');
  };

  const deleteBook = (id) => {
    const newBooks = _.cloneDeep(books).filter((book) => book.id !== id);
    setBooks(newBooks);
  };

  const booksList = books.map((book) => (
    <Col s={12} md={6} xl={4} key={book.id}>
      <BookCard {...book} deleteBook={deleteBook} />
    </Col>
  ));
  return (
    <div>
      <h2 className="text-center mb-4">Knjige</h2>
      <Container>
        <Row className="g-3">{booksList}</Row>
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
      </Container>
    </div>
  );
}
