import React from 'react';
import NewBookForm from '../../components/NewBookForm/NewBookForm';

export default function NewBookPage({ books, setBooks }) {
  return (
    <>
      <h2 className="text-center mb-4">Dodaj novi film</h2>
      <NewBookForm books={books} setBooks={setBooks} />
    </>
  );
}
