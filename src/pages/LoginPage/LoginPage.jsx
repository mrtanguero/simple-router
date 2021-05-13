import React from 'react';
// import { useHistory } from 'react-router';

import LoginForm from '../../components/LoginForm/LoginForm';

export default function LoginPage({ setJwtToken }) {
  // const history = useHistory();

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   setJwtToken(true);
  //   localStorage.setItem('jwtToken', 'true');
  //   history.replace('/movies');
  // };

  return (
    <>
      <h2 className="text-center mb-4">Ulogujte se</h2>
      <LoginForm setJwtToken={setJwtToken} />
    </>
  );
}
