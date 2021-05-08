import React, { useState } from 'react';
import _ from 'lodash';
import { useParams, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function EditPersonForm({ people, setPeople }) {
  const { personId } = useParams();
  const history = useHistory();
  const person = people.filter((person) => person.id === +personId)[0];

  const [personName, setPersonName] = useState(person.name);
  const [personBdate, setPersonBdate] = useState(person.bdate);
  const [personCity, setPersonCity] = useState(person.city);
  const [personImageUrl, setPersonImageUrl] = useState(person.imageUrl);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let newPeople = _.cloneDeep(people).filter((mov) => mov.id !== person.id);
    newPeople = [
      {
        id: +personId,
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
                <Form.Label>Ime i prezime</Form.Label>
                <Form.Control
                  type="text"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="personBdate">
                <Form.Label>Rođendan</Form.Label>
                <Form.Control
                  type="text"
                  value={personBdate}
                  onChange={(e) => setPersonBdate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="personCity">
                <Form.Label>Grad</Form.Label>
                <Form.Control
                  type="text"
                  value={personCity}
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
                Snimi izmjene
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
