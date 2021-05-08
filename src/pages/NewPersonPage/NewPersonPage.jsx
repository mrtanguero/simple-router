import React from 'react';
import NewPersonForm from '../../components/NewPersonForm/NewPersonForm';

export default function NewPersonPage({ people, setPeople }) {
  return (
    <>
      <h2 className="text-center mb-4">Dodaj novi film</h2>
      <NewPersonForm people={people} setPeople={setPeople} />
    </>
  );
}
