import React, { useState } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function NewPersonForm({ people, setPeople }) {
  const history = useHistory();

  const [personName, setPersonName] = useState('');
  const [personBdate, setPersonBdate] = useState('');
  const [personCity, setPersonCity] = useState('');
  const [personImageUrl, setPersonImageUrl] = useState(
    'https://via.placeholder.com/300x450?text=Vaša+slika+će+ići+ovdje'
  );

  const getNewId = () => {
    return (
      people.reduce(
        (max, current) => (current.id > max ? current.id : max),
        0
      ) + 1
    );
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let newPeople = _.cloneDeep(people);
    newPeople = [
      {
        id: getNewId(),
        name: personName,
        bdate: personBdate,
        city: personCity,
        imageUrl: personImageUrl,
      },
      ...newPeople,
    ];
    setPeople(newPeople);
    history.replace('/people');
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <Container>
        <Row>
          <Col md={7}>
            <div className="form-fields-container pe-5 ps-5">
              <Form.Group className="mb-4" controlId="personName">
                <Form.Label>Naziv knjige</Form.Label>
                <Form.Control
                  type="text"
                  value={personName}
                  placeholder="Unesite ime osobe..."
                  onChange={(e) => setPersonName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="personBdate">
                <Form.Label>Žanr</Form.Label>
                <Form.Control
                  type="text"
                  value={personBdate}
                  placeholder="Unesite rođendan..."
                  onChange={(e) => setPersonBdate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="personCity">
                <Form.Label>Režija</Form.Label>
                <Form.Control
                  type="text"
                  value={personCity}
                  placeholder="Unesite grad..."
                  onChange={(e) => setPersonCity(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="personImageUrl">
                <Form.Label>URL fotografije</Form.Label>
                <Form.Control
                  type="url"
                  value={personImageUrl}
                  onChange={(e) => setPersonImageUrl(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="outline-primary"
                type="submit"
                className="mb-4 w-100"
              >
                Dodaj osobu
              </Button>
            </div>
          </Col>
          <Col md={5}>
            <div className="image-container mb-4">
              <img
                src={personImageUrl}
                alt={personName}
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
