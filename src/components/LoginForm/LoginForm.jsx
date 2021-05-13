import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { apiExample } from '../../api/apiExample';

export default function LoginForm({ setJwtToken }) {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();

    apiExample
      .post(
        '/authenticate',
        {
          username: username,
          password: password,
          rememberMe: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        }
      )
      .then((response) => {
        localStorage.setItem('jwtToken', response.data.id_token);
        setJwtToken(response.data.id_token);
        history.replace('/movies');
      })
      .catch((err) => {
        console.log(err);
      });
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
    </Form>
  );
}
