import React from 'react';
import MovieForm from '../components/MovieForm/MovieForm';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  title: 'Components/MovieForm',
  component: MovieForm,
};

const queryClient = new QueryClient();

const Template = (args) => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <MovieForm {...args} />
    </QueryClientProvider>
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  setMessage: () => console.log('Funkcija.'),
};
