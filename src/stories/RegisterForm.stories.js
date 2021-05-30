import React from 'react';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  title: 'Components/RegisterForm',
  component: RegisterForm,
};

const queryClient = new QueryClient();

const Template = (args) => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <RegisterForm {...args} />
    </QueryClientProvider>
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  setMessage: () => console.log('Funkcija.'),
};
