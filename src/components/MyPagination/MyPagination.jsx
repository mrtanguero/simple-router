import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useHistory } from 'react-router-dom';
import { useQuery } from '../../hooks/useQuery';

export default function MyPagination({ size = 20, rows = 21 }) {
  const history = useHistory();
  const query = useQuery();
  const numOfPages = Math.ceil(rows / size);
  if (numOfPages <= 1) return null;

  const paginationItems = [];
  for (let i = 0; i < numOfPages; i++) {
    paginationItems.push(
      <Pagination.Item
        activeLabel={null}
        key={i + 1}
        onClick={() => history.push(`${history.location.pathname}?page=${i}`)}
        active={i === +query.get('page')}
      >
        {i + 1}
      </Pagination.Item>
    );
  }
  return <Pagination>{paginationItems}</Pagination>;
}
