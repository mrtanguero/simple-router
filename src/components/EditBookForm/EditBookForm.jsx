import React, { useState } from 'react';
import _ from 'lodash';
import { useParams, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function EditBookForm({ books, setBooks }) {
  const { bookId } = useParams();
  const history = useHistory();
  const book = books.filter((book) => book.id === +bookId)[0];

  const [bookTitle, setBookTitle] = useState(book.title);
  const [bookYear, setBookYear] = useState(book.year);
  const [bookAuthor, setBookAuthor] = useState(book.author);
  const [bookQuote, setBookQuote] = useState(book.quote);
  const [bookImageUrl, setBookImageUrl] = useState(book.imageUrl);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let newBooks = _.cloneDeep(books).filter((mov) => mov.id !== book.id);
    newBooks = [
      {
        id: +bookId,
        title: bookTitle,
        year: bookYear,
        author: bookAuthor,
        quote: bookQuote,
        imageUrl: bookImageUrl,
      },
      ...newBooks,
    ];
    setBooks(newBooks);
    history.replace('/books');
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <Container>
        <Row>
          <Col md={7}>
            <div className="form-fields-container pe-5 ps-5">
              <Form.Group className="mb-4" controlId="bookName">
                <Form.Label>Naziv filma</Form.Label>
                <Form.Control
                  type="text"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="bookYear">
                <Form.Label>Godina izdavanja</Form.Label>
                <Form.Control
                  type="number"
                  value={+bookYear}
                  onChange={(e) => setBookYear(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="bookAuthor">
                <Form.Label>Žanr</Form.Label>
                <Form.Control
                  type="text"
                  value={bookAuthor}
                  onChange={(e) => setBookAuthor(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="bookQuote">
                <Form.Label>Režija</Form.Label>
                <Form.Control
                  type="text"
                  value={bookQuote}
                  onChange={(e) => setBookQuote(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="bookImageUrl">
                <Form.Label>URL fotografije</Form.Label>
                <Form.Control
                  type="url"
                  value={bookImageUrl}
                  onChange={(e) => setBookImageUrl(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="outline-primary"
                type="submit"
                className="mb-4 w-100"
              >
                Snimi izmjene
              </Button>
            </div>
          </Col>
          <Col md={5}>
            <div className="image-container mb-4">
              <img
                src={bookImageUrl}
                alt={bookTitle}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}
