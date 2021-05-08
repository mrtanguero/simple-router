import React from 'react';
import './PersonCard.css';

import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router';

export default function PersonCard({
  id,
  name,
  bdate,
  city,
  imageUrl,
  deletePerson,
}) {
  const history = useHistory();

  const onClickHandler = () => {
    history.push(`/people/${id}`);
  };

  const onDeleteHandler = (e) => {
    e.stopPropagation();
    deletePerson(id);
  };

  return (
    <Card
      bg="dark"
      text="light"
      style={{ height: '100%' }}
      className="person-card position-relative mb-2 d-flex flex-row"
      onClick={onClickHandler}
    >
      <div
        className="img-container"
        style={{ width: '40%', height: '100% !important' }}
      >
        <Card.Img
          src={imageUrl}
          style={{ height: '100%', objectFit: 'cover' }}
        />
      </div>

      <Card.Body className="d-flex flex-column justify-content-around">
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          <span className="d-block mb-2">
            <strong className="text-muted">Datum rođenja:</strong> {bdate}
          </span>
          <span className="d-block">
            <strong className="text-muted">Grad:</strong> {city}
          </span>
        </Card.Text>
      </Card.Body>
      <div
        className="icon-container position-absolute top-0 end-0 mt-1 me-1"
        onClick={onDeleteHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </div>
    </Card>
  );
}
