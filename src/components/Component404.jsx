import React from 'react';
import { Link } from 'react-router-dom';

/* Components */
import PageTitle from '../templates/PageTitle';
import Header from '../templates/Header';

export default function Component404() {
  return (
    <div className="root">
      <Header />
      <PageTitle title={'Página não encontrada'} hasBacklink={true} />
      <div className="content">
        <div className="page404">
          <div className="container">
            <h3 className="title">Página não encontrada</h3>
            <Link to="/" className="link-back">Página inicial</Link>
          </div>
        </div>
      </div>
    </div>
  )
}