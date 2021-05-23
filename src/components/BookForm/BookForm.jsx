import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { useForm } from 'react-hook-form';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { getBook, createBook, updateBook } from '../../services/books.js';

export default function BookForm() {
  const { bookId } = useParams();
  const history = useHistory();

  const { data: response } = useQuery(['book', bookId], () => {
    return bookId !== 'new' && getBook(bookId);
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: response?.data,
  });

  useEffect(() => {
    if (!response) return;
    reset(response.data);
  }, [response, reset]);

  const mutationCreate = useMutation((newBook) => createBook(newBook), {
    onSuccess: () => history.replace('/books'),
  });
  const mutationUpdate = useMutation((newBook) => updateBook(newBook), {
    onSuccess: () => history.replace('/books'),
  });

  const onSubmitHandler = (data) => {
    if (bookId !== 'new') {
      mutationUpdate.mutate(data);
    } else {
      mutationCreate.mutate(data);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <h2 className="text-center mb-4">
        {bookId === 'new' ? 'Dodaj knjigu' : 'Izmijeni knjigu'}
      </h2>
      <Container>
        <Form.Group className="mb-4" controlId="bookName">
          <Form.Label>Naziv knjige</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite naziv knjige..."
            {...register('isbn', { required: 'Polje je obavezno' })}
          />
          <small className="invalid-field">{errors.isbn?.message}</small>
        </Form.Group>

        <Form.Group className="mb-4" controlId="bookWriter">
          <Form.Label>Scenario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite pisca..."
            {...register('writerName', { required: 'Polje je obavezno' })}
          />
          <small className="invalid-field">{errors.writerName?.message}</small>
        </Form.Group>

        <Form.Group className="mb-4" controlId="bookPublisher">
          <Form.Label>Izdavač</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite ime izdavača..."
            {...register('publisherName', { required: 'Polje je obavezno' })}
          />
          <small className="invalid-field">
            {errors.publisherName?.message}
          </small>
        </Form.Group>

        <Form.Group className="mb-4" controlId="bookPublishedDate">
          <Form.Label>Datum izdavanja (format GGGG-MM-DD)</Form.Label>
          <Form.Control
            type="string"
            placeholder="Unesite datum izdavanja..."
            {...register('publishedDate', { required: 'Polje je obavezno' })}
          />
          <small className="invalid-field">
            {errors.publishedDate?.message}
          </small>
        </Form.Group>

        <Form.Group className="mb-4" controlId="bookGenre">
          <Form.Label>Žanr</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite žanr"
            {...register('genre', { required: 'Polje je obavezno' })}
          />
          <small className="invalid-field">{errors.genre?.message}</small>
        </Form.Group>

        <Button variant="outline-primary" type="submit" className="mb-4 w-100">
          {bookId === 'new' ? 'Dodaj knjigu' : 'Snimi izmjene'}
        </Button>
      </Container>
    </Form>
  );
}
