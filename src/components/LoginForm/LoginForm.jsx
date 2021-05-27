import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { login } from '../../services/account.js';

export default function LoginForm({ setJwtToken }) {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const mutation = useMutation((data) => login(data), {
    onSuccess: (response) => {
      localStorage.setItem('jwtToken', response.data.id_token);
      setJwtToken(response.data.id_token);
      history.replace('/movies');
    },
    onError: (error) => {
      if (error.response?.data.detail === 'Bad credentials') {
        setError('credentials', {
          type: 'manual',
          message:
            'Pogrešni kredencijali! Provjerite svoj username i password.',
        });
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
      onChange={() => clearErrors('credentials')}
    >
      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Label>Korisničko ime</Form.Label>
        <Form.Control
          type="text"
          placeholder="Unesite Vaše korisničko ime"
          {...register('username', {
            required: 'Polje je obavezno',
          })}
        />
        <small className="invalid-field">{errors.username?.message}</small>
      </Form.Group>
      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Šifra</Form.Label>
        <Form.Control
          type="password"
          placeholder="Unesite Vašu šifru"
          {...register('password', {
            required: 'Polje je obavezno',
            minLength: {
              value: 4,
              message: 'Šifra ne može biti kraća od 4 karaktera',
            },
          })}
        />
        <small className="invalid-field">{errors.password?.message}</small>
      </Form.Group>
      {errors.credentials && (
        <div className="text-center mb-4 invalid-field">
          {errors.credentials?.message}
        </div>
      )}
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

LoginForm.propTypes = {
  setJwtToken: PropTypes.func.isRequired,
};
