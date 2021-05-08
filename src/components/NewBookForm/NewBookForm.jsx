import React, { useState } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function NewBookForm({ books, setBooks }) {
  const history = useHistory();

  const [bookTitle, setBookTitle] = useState('');
  const [bookYear, setBookYear] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookQuote, setBookQuote] = useState('');
  const [bookImageUrl, setBookImageUrl] = useState(
    'https://via.placeholder.com/300x450?text=Vaša+slika+će+ići+ovdje'
  );

  const getNewId = () => {
    return (
      books.reduce((max, current) => (current.id > max ? current.id : max), 0) +
      1
    );
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let newBooks = _.cloneDeep(books);
    newBooks = [
      {
        id: getNewId(),
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
                <Form.Label>Naziv knjige</Form.Label>
                <Form.Control
                  type="text"
                  value={bookTitle}
                  placeholder="Unesite ime knjige..."
                  onChange={(e) => setBookTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="bookYear">
                <Form.Label>Godina izdavanja</Form.Label>
                <Form.Control
                  type="number"
                  value={bookYear}
                  placeholder="Unesite godinu izdavanja..."
                  onChange={(e) => setBookYear(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="bookAuthor">
                <Form.Label>Žanr</Form.Label>
                <Form.Control
                  type="text"
                  value={bookAuthor}
                  placeholder="Unesite ime autora..."
                  onChange={(e) => setBookAuthor(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="bookQuote">
                <Form.Label>Režija</Form.Label>
                <Form.Control
                  type="text"
                  value={bookQuote}
                  placeholder="Unesite kratak citat iz knjige..."
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
                Dodaj film
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
