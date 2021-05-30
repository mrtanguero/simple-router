import React from 'react';
import BookForm from '../components/BookForm/BookForm';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  title: 'Components/BookForm',
  component: BookForm,
};

const queryClient = new QueryClient();

const Template = (args) => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <BookForm {...args} />
    </QueryClientProvider>
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  setMessage: () => console.log('Funkcija.'),
};
