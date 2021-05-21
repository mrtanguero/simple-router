import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useQueryParamPage = () => {
  let location = useLocation().search;
  const queryParams = useMemo(() => new URLSearchParams(location), [location]);
  return queryParams.get('page');
};
