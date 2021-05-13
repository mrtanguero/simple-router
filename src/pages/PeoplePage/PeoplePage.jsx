import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Link, useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

import { apiExample } from '../../api/apiExample';
import EditIcon from '../../components/EditIcon/EditIcon';
import DeleteIcon from '../../components/DeleteIcon/DeleteIcon';

export default function PeoplePage({ people, setPeople }) {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (id) => {
    setModalData({
      id: id,
      personName:
        people.find((person) => person.id === id).firstName +
        ' ' +
        people.find((person) => person.id === id).lastName,
    });
    setShowModal(true);
  };

  const translateGender = (gender) => {
    switch (gender) {
      case 'MALE':
        return 'muški';
      case 'FEMALE':
        return 'ženski';
      case 'OTHER':
        return 'ostalo';
      default:
        break;
    }
  };

  useEffect(() => {
    apiExample
      .get('/people', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      })
      .then((response) => {
        setPeople(response.data);
      })
      .catch((err) => console.log(err));
  }, [setPeople]);

  const onAddNewpersonButonHandler = () => {
    history.push('/people/new');
  };

  const deleteperson = (id) => {
    apiExample.delete(`/people/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    });
    const newPeople = _.cloneDeep(people).filter((person) => person.id !== id);
    setPeople(newPeople);
  };

  const handleConfirmDelete = (id) => {
    deleteperson(id);
    setShowModal(false);
  };

  const headers = [
    'Ime',
    'Prezime',
    'Pol',
    'Datum rođenja',
    'Godine',
    'Zanimanje',
    '',
  ];
  return (
    <div>
      <h2 className="text-center mb-4">Knjige</h2>
      <Container>
        <Table striped hover>
          <thead>
            <tr>
              {headers.map((head) => (
                <th key={head}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr className="align-middle" key={person.id}>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>{translateGender(person.gender)}</td>
                <td>{person.dateOfBirth}</td>
                <td>{person.age}</td>
                <td>{person.occupation}</td>
                <td>
                  <div className="d-flex">
                    <Link
                      to={`/people/${person.id}`}
                      className="btn btn-primary me-1"
                    >
                      <EditIcon />
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => handleShowModal(person.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button
          onClick={onAddNewpersonButonHandler}
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
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header>
            <Modal.Title>UPOZORENJE:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Da li stvarno želite da obrišete osobu{' '}
            <strong>{modalData.personName}</strong>?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Odustani
            </Button>
            <Button
              variant="danger"
              onClick={() => handleConfirmDelete(modalData.id)}
            >
              Obriši
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
