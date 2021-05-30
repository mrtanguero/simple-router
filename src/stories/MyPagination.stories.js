import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MyPagination from '../components/MyPagination/MyPagination';

export default {
  title: 'Components/MyPagination',
  component: MyPagination,
};

const Template = (args) => (
  <BrowserRouter>
    <MyPagination {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  size: 20,
  rows: 40,
};
