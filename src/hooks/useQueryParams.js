import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useQueryParams = () => {
  let location = useLocation().search;
  const query = useMemo(() => new URLSearchParams(location), [location]);
  return query;
};
