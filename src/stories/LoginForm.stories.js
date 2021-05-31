import React from 'react';
import LoginForm from './LoginForm';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  title: 'Components/LoginForm',
  component: LoginForm,
};

const queryClient = new QueryClient();

const Template = (args) => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <LoginForm {...args} />
    </QueryClientProvider>
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  setJwtToken: () => {},
};
