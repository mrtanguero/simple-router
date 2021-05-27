import React from 'react';
import PropTypes from 'prop-types';
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

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  jwtToken: PropTypes.string,
  children: PropTypes.node,
};
