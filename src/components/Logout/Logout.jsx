import { useEffect } from 'react';
import { useHistory } from 'react-router';

export default function Logout({ setIsLoggedIn }) {
  const history = useHistory();
  useEffect(() => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    history.push('/login');
  }, [setIsLoggedIn, history]);
  return null;
}
