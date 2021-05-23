import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { login } from '../../services/account.js';

export default function LoginForm({ setJwtToken }) {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation((data) => login(data), {
    onSuccess: (response) => {
      localStorage.setItem('jwtToken', response.data.id_token);
      setJwtToken(response.data.id_token);
      history.replace('/movies');
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutation.mutate({ username, password });
  };

  return (
    <Form className="w-75 d-flex flex-column m-auto" onSubmit={onSubmitHandler}>
      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Label>Korisničko ime</Form.Label>
        <Form.Control
          type="text"
          placeholder="Unesite Vaše korisničko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Šifra</Form.Label>
        <Form.Control
          type="password"
          placeholder="Unesite Vašu šifru"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="outline-primary" type="submit">
        Ulogujte se
      </Button>
      <small className="m-auto mt-2">
        Ako još uvijek nemate nalog, možete se registrovati{' '}
        <Link to="/register">ovdje</Link>
      </small>
    </Form>
  );
}
