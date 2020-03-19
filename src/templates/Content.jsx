import React from 'react';

/* Components */
import PageTitle from './PageTitle';
import Login from '../components/Login';

export default props => (
  <div className="content">
    <PageTitle title="Entre em sua conta" />

    <Login />
  </div>
)