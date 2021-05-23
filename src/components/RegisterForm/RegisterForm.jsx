import React from 'react';
import './RegisterForm.css';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerAccount } from '../../services/account.js';

export default function RegisterForm() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const mutation = useMutation((data) => registerAccount(data), {
    onSuccess: () => {
      history.replace('/login');
    },
    onError: (error) => {
      if (error.response.data.errorKey === 'userexists') {
        setError(
          'login',
          {
            type: 'manual',
            message: 'Username već postoji!',
          },
          { shouldFocus: true }
        );
      }
      if (error.response.data.errorKey === 'emailexists') {
        setError(
          'email',
          {
            type: 'manual',
            message: 'Email već postoji!',
          },
          { shouldFocus: true }
        );
      }
    },
  });

  const onSubmitHandler = (data) => {
    mutation.mutate(data);
  };

  return (
    <Form
      className="w-75 d-flex flex-column m-auto"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <h2 className="text-center mb-4">Registrujte se</h2>
      <Form.Group className="mb-4" controlId="formLogin">
        <Form.Label>Korisničko ime (username)</Form.Label>
        <Form.Control
          type="text"
          placeholder="Unesite korisničko ime"
          {...register('login', {
            required: 'Polje je obavezno',
          })}
        />
        <small className="invalid-field">{errors.login?.message}</small>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formFirstName">
        <Form.Label>Ime</Form.Label>
        <Form.Control
          type="text"
          {...register('firstName', {
            required: 'Polje je obavezno',
          })}
          placeholder="Unesite svoje ime"
        />
        <small className="invalid-field">{errors.firstName?.message}</small>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formLastName">
        <Form.Label>Prezime</Form.Label>
        <Form.Control
          type="text"
          {...register('lastName', {
            required: 'Polje je obavezno',
          })}
          placeholder="Unesite svoje prezime"
        />
        <small className="invalid-field">{errors.lastName?.message}</small>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          {...register('email', {
            required: 'Polje je obavezno',
          })}
          placeholder="Unesite svoju email adresu"
        />
        <small className="invalid-field">{errors.email?.message}</small>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formPassword">
        <Form.Label>Šifra</Form.Label>
        <Form.Control
          type="password"
          {...register('password', {
            required: 'Polje je obavezno',
          })}
          placeholder="Unesite svoju šifru"
        />
        <small className="invalid-field">{errors.password?.message}</small>
      </Form.Group>

      <Button variant="outline-primary" type="submit">
        Registrujte se
      </Button>
      <small className="m-auto mt-2">
        Ako već imate nalog, možete se ulogovati <Link to="/login">ovdje</Link>
      </small>
    </Form>
  );
}
