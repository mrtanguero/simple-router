import React from 'react';
import EditBookForm from '../../components/EditBookForm/EditBookForm';

export default function EditBookPage({ books, setBooks }) {
  return (
    <>
      <h2 className="text-center mb-4">Izmijeni knjigu</h2>
      <EditBookForm books={books} setBooks={setBooks} />
    </>
  );
}
