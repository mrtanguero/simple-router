import { useEffect } from 'react';
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
