import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function CenteredSpinner() {
  console.log('Rendering spinner...');
  return (
    <div
      className="w-100 d-flex align-items-center justify-content-center"
      style={{ height: '80vh' }}
    >
      <Spinner animation="border" variant="info" />
    </div>
  );
}
