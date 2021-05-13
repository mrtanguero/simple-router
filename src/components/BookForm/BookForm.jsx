import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { apiExample } from '../../api/apiExample';

export default function BookForm() {
  const { bookId } = useParams();
  const history = useHistory();

  const [bookName, setBookName] = useState('');
  const [bookPublisher, setBookPublisher] = useState('');
  const [bookPublishedDate, setBookPublishedDate] = useState('');
  const [bookWriter, setBookWriter] = useState('');
  const [bookGenre, setBookGenre] = useState('');

  useEffect(() => {
    if (bookId === 'new') return;
    apiExample
      .get(`/books/${bookId}`)
      .then((response) => {
        setBookName(response.data.isbn);
        setBookWriter(response.data.writerName);
        setBookPublisher(response.data.publisherName);
        setBookPublishedDate(response.data.publishedDate);
        setBookGenre(response.data.genre);
      })
      .catch((err) => console.log(err));
  }, [bookId]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newBook = {
      isbn: bookName,
      publishedDate: bookPublishedDate,
      publisherName: bookPublisher,
      writerName: bookWriter,
      genre: bookGenre,
    };
    if (bookId !== 'new') {
      newBook.id = +bookId;
      apiExample
        .put(`/books`, newBook)
        .then(() => history.replace('/books'))
        .catch((err) => console.log(err));
    } else {
      apiExample
        .post('/books', newBook)
        .then(() => history.replace('/books'))
        .catch((err) => console.log(err));
    }
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <h2 className="text-center mb-4">
        {bookId === 'new' ? 'Dodaj knjigu' : 'Izmijeni knjigu'}
      </h2>
      <Container>
        <Form.Group className="mb-4" controlId="bookName">
          <Form.Label>Naziv knjige</Form.Label>
          <Form.Control
            type="text"
            value={bookName}
            placeholder="Unesite naziv knjige..."
            onChange={(e) => setBookName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="bookWriter">
          <Form.Label>Scenario</Form.Label>
          <Form.Control
            type="text"
            value={bookWriter}
            placeholder="Unesite pisca..."
            onChange={(e) => setBookWriter(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="bookPublisher">
          <Form.Label>Izdavač</Form.Label>
          <Form.Control
            type="text"
            value={bookPublisher}
            placeholder="Unesite ime izdavača..."
            onChange={(e) => setBookPublisher(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="bookPublishedDate">
          <Form.Label>Datum izdavanja (format GGGG-MM-DD)</Form.Label>
          <Form.Control
            type="string"
            value={bookPublishedDate}
            placeholder="Unesite datum izdavanja..."
            onChange={(e) => setBookPublishedDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="bookGenre">
          <Form.Label>Žanr</Form.Label>
          <Form.Control
            type="text"
            value={bookGenre}
            placeholder="Unesite žanr"
            onChange={(e) => setBookGenre(e.target.value)}
          />
        </Form.Group>

        <Button variant="outline-primary" type="submit" className="mb-4 w-100">
          {bookId === 'new' ? 'Dodaj knjigu' : 'Snimi izmjene'}
        </Button>
      </Container>
    </Form>
  );
}
