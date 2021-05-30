import React from 'react';
import PersonForm from '../components/PersonForm/PersonForm';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  title: 'Components/PersonForm',
  component: PersonForm,
};

const queryClient = new QueryClient();

const Template = (args) => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <PersonForm {...args} />
    </QueryClientProvider>
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  setMessage: () => console.log('Funkcija.'),
};
