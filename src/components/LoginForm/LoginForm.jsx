import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function LoginForm({ onSubmitHandler }) {
  return (
    <Form className="w-75 d-flex flex-column m-auto" onSubmit={onSubmitHandler}>
      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Label>Korisničko ime</Form.Label>
        <Form.Control type="text" placeholder="Unesite Vaše korisničko ime" />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Šifra</Form.Label>
        <Form.Control type="password" placeholder="Unesite Vašu šifru" />
      </Form.Group>
      <Button variant="outline-primary" type="submit">
        Ulogujte se
      </Button>
    </Form>
  );
}
