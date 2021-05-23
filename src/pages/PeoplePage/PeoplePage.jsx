import React, { useState } from 'react';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import { useQueryParamPage } from '../../hooks/useQueryParamPage.js';
import { getPeople, deletePerson } from '../../services/people.js';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

import EditIcon from '../../components/EditIcon/EditIcon';
import DeleteIcon from '../../components/DeleteIcon/DeleteIcon';
import MyPagination from '../../components/MyPagination/MyPagination';
import Spinner from 'react-bootstrap/Spinner';

export default function PeoplePage() {
  const history = useHistory();
  const pageNumber = useQueryParamPage();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const queryClient = useQueryClient();
  const mutation = useMutation((id) => deletePerson(id), {
    onSuccess: () => queryClient.invalidateQueries('people'),
  });

  const {
    data: response,
    isLoading,
    error,
  } = useQuery(['people', pageNumber], () => getPeople(pageNumber), {
    keepPreviousData: true,
  });

  if (error) console.log(error);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (id) => {
    setModalData({
      id: id,
      personName:
        response.data.find((person) => person.id === id).firstName +
        ' ' +
        response.data.find((person) => person.id === id).lastName,
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

  const onAddNewpersonButonHandler = () => {
    history.push('/people/new');
  };

  const handleConfirmDelete = (id) => {
    mutation.mutate(id);
    handleCloseModal();
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
      <h2 className="text-center mb-4">
        Osobe {isLoading && <Spinner animation="border" variant="info" />}
      </h2>
      <Container className={response?.headers['x-total-count'] <= 20 && 'mb-5'}>
        <Table striped hover>
          <thead>
            <tr>
              {headers.map((head) => (
                <th key={head}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {response?.data.map((person) => (
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
        <MyPagination rows={response?.headers['x-total-count']} />
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
