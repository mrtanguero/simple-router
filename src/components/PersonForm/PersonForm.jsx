import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import {
  getPerson,
  createPerson,
  updatePerson,
} from '../../services/people.js';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default function PersonForm({ setMessage }) {
  const { personId } = useParams();
  const history = useHistory();

  const { data: response } = useQuery(['person', personId], () => {
    return personId !== 'new' && getPerson(personId);
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

  const mutationCreate = useMutation((newPerson) => createPerson(newPerson), {
    onSuccess: () => {
      setMessage('Osoba je uspješno kreirana.');
      history.replace('/people');
    },
    onError: (error) => console.log(error.response),
  });
  const mutationUpdate = useMutation((newPerson) => updatePerson(newPerson), {
    onSuccess: () => {
      setMessage('Osoba je uspješno izmijenjena.');
      history.replace('/people');
    },
    onError: (error) => console.log(error.response),
  });

  const onSubmitHandler = (data) => {
    if (personId !== 'new') {
      mutationUpdate.mutate(data);
    } else {
      mutationCreate.mutate(data);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <h2 className="text-center mb-4">
        {personId === 'new' ? 'Dodaj osobu' : 'Izmijeni osobu'}
      </h2>
      <Container>
        <Form.Group className="mb-4" controlId="personFirstName">
          <Form.Label>Ime</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite ime osobe..."
            {...register('firstName', { required: 'Polje je obavezno' })}
          />
          <small className="invalid-field">{errors.firstName?.message}</small>
        </Form.Group>

        <Form.Group className="mb-4" controlId="personLastName">
          <Form.Label>Prezime</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite prezime osobe..."
            {...register('lastName', { required: 'Polje je obavezno' })}
          />
          <small className="invalid-field">{errors.lastName?.message}</small>
        </Form.Group>

        <Form.Group className="mb-4" controlId="personGender">
          <Form.Label>Pol</Form.Label>
          <Form.Control
            as="select"
            {...register('gender', { required: 'Polje je obavezno' })}
          >
            <option value="">--Odaberite pol osobe--</option>
            <option value="MALE">muški</option>
            <option value="FEMALE">ženski</option>
            <option value="OTHER">ostalo</option>
          </Form.Control>
          <small className="invalid-field">{errors.gender?.message}</small>
        </Form.Group>

        <Form.Group className="mb-4" controlId="personDateOfBirth">
          <Form.Label>Datum rođenja</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite datum rođenja..."
            {...register('dateOfBirth', { required: 'Polje je obavezno' })}
          />
          <small className="invalid-field">{errors.dateOfBirth?.message}</small>
        </Form.Group>

        <Form.Group className="mb-4" controlId="personAge">
          <Form.Label>Godine</Form.Label>
          <Form.Control
            type="number"
            placeholder="Unesite godište..."
            {...register('age', { required: 'Polje je obavezno' })}
          />
          <small className="invalid-field">{errors.age?.message}</small>
        </Form.Group>

        <Form.Group className="mb-4" controlId="personOccupation">
          <Form.Label>Žanr</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite zanimanje..."
            {...register('occupation', { required: 'Polje je obavezno' })}
          />
          <small className="invalid-field">{errors.occupation?.message}</small>
        </Form.Group>

        <Button variant="outline-primary" type="submit" className="mb-4 w-100">
          {personId === 'new' ? 'Dodaj osobu' : 'Snimi izmjene'}
        </Button>
      </Container>
    </Form>
  );
}
