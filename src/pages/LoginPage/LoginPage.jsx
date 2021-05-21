import React from 'react';
// import { useHistory } from 'react-router';

import LoginForm from '../../components/LoginForm/LoginForm';

export default function LoginPage({ setJwtToken }) {
  return (
    <>
      <h2 className="text-center mb-4">Ulogujte se</h2>
      <LoginForm setJwtToken={setJwtToken} />
    </>
  );
}
