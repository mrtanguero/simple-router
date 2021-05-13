import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { apiExample } from '../../api/apiExample';

export default function PersonForm() {
  const { personId } = useParams();
  const history = useHistory();

  const [personFirstName, setPersonFirstName] = useState('');
  const [personLastName, setPersonLastName] = useState('');
  const [personGender, setPersonGender] = useState('');
  const [personDateOfBirth, setPersonDateOfBirth] = useState('');
  const [personAge, setPersonAge] = useState('');
  const [personOccupation, setPersonOccupation] = useState('');

  useEffect(() => {
    if (personId === 'new') return;
    apiExample
      .get(`/people/${personId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      })
      .then((response) => {
        setPersonFirstName(response.data.firstName);
        setPersonLastName(response.data.lastName);
        setPersonGender(response.data.gender);
        setPersonDateOfBirth(response.data.dateOfBirth);
        setPersonAge(response.data.age);
        setPersonOccupation(response.data.occupation);
      })
      .catch((err) => console.log(err));
  }, [personId]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newPerson = {
      firstName: personFirstName,
      lastName: personLastName,
      gender: personGender,
      dateOfBirth: personDateOfBirth,
      age: personAge,
      occupation: personOccupation,
    };
    if (personId !== 'new') {
      newPerson.id = +personId;
      apiExample
        .put(`/people`, newPerson, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        })
        .then(() => history.replace('/people'))
        .catch((err) => console.log(err));
    } else {
      apiExample
        .post('/people', newPerson, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        })
        .then(() => history.replace('/people'))
        .catch((err) => console.log(err));
    }
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <h2 className="text-center mb-4">
        {personId === 'new' ? 'Dodaj osobu' : 'Izmijeni osobu'}
      </h2>
      <Container>
        <Form.Group className="mb-4" controlId="personFirstName">
          <Form.Label>Ime</Form.Label>
          <Form.Control
            type="text"
            value={personFirstName}
            placeholder="Unesite ime osobe..."
            onChange={(e) => setPersonFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="personLastName">
          <Form.Label>Prezime</Form.Label>
          <Form.Control
            type="text"
            value={personLastName}
            placeholder="Unesite prezime osobe..."
            onChange={(e) => setPersonLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="personGender">
          <Form.Label>Pol</Form.Label>
          <Form.Control
            as="select"
            value={personGender}
            onChange={(e) => setPersonGender(e.target.value)}
          >
            <option value="">--Odaberite pol osobe--</option>
            <option value="MALE">muški</option>
            <option value="FEMALE">ženski</option>
            <option value="OTHER">ostalo</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-4" controlId="personDateOfBirth">
          <Form.Label>Datum rođenja</Form.Label>
          <Form.Control
            type="text"
            value={personDateOfBirth}
            placeholder="Unesite ime izdavača..."
            onChange={(e) => setPersonDateOfBirth(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="personAge">
          <Form.Label>Godine</Form.Label>
          <Form.Control
            type="number"
            value={personAge}
            placeholder="Unesite godište..."
            onChange={(e) => setPersonAge(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="personOccupation">
          <Form.Label>Žanr</Form.Label>
          <Form.Control
            type="text"
            value={personOccupation}
            placeholder="Unesite zanimanje..."
            onChange={(e) => setPersonOccupation(e.target.value)}
          />
        </Form.Group>

        <Button variant="outline-primary" type="submit" className="mb-4 w-100">
          {personId === 'new' ? 'Dodaj osobu' : 'Snimi izmjene'}
        </Button>
      </Container>
    </Form>
  );
}
