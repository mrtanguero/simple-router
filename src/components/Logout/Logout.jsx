import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

export default function Logout({ setJwtToken }) {
  const history = useHistory();
  useEffect(() => {
    setJwtToken(false);
    localStorage.removeItem('jwtToken');
    history.push('/login');
  }, [setJwtToken, history]);
  return null;
}

Logout.propTypes = {
  setJwtToken: PropTypes.func.isRequired,
};
