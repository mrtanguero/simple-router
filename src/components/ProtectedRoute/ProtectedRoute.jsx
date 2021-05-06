import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute({ path, isLoggedIn, children }) {
  return (
    <>
      {isLoggedIn ? (
        <Route path={path}>{children}</Route>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}
