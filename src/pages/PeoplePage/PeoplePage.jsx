import React from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import PersonCard from '../../components/PersonCard/PersonCard';

export default function PeoplePage({ people, setPeople }) {
  const history = useHistory();

  const onAddNewPersonButonHandler = () => {
    history.push('/people/new');
  };

  const deletePerson = (id) => {
    const newPeople = _.cloneDeep(people).filter((person) => person.id !== id);
    setPeople(newPeople);
  };

  const peopleList = people.map((person) => (
    <Col s={12} md={6} xl={4} key={person.id}>
      <PersonCard {...person} deletePerson={deletePerson} />
    </Col>
  ));
  return (
    <div>
      <h2 className="text-center mb-4">Osobe</h2>
      <Container>
        <Row className="g-3">{peopleList}</Row>
        <Button
          onClick={onAddNewPersonButonHandler}
          variant="danger"
          style={{
            position: 'fixed',
            bottom: '3rem',
            right: '4rem',
            boxShadow: '0 3px 6px rgba(0, 0, 0, .4)',
          }}
        >
          + Dodaj novu osobu
        </Button>
      </Container>
    </div>
  );
}
