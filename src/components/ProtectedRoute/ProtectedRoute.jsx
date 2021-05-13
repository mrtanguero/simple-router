import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute({ path, jwtToken, children }) {
  return (
    <>
      {jwtToken ? (
        <Route path={path}>{children}</Route>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}
