import React from 'react';
import EditPersonForm from '../../components/EditPersonForm/EditPersonForm';

export default function EditPersonPage({ people, setPeople }) {
  return (
    <>
      <h2 className="text-center mb-4">Izmijeni osobu</h2>
      <EditPersonForm people={people} setPeople={setPeople} />;
    </>
  );
}
