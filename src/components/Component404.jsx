import React, { Component } from 'react';
import { Link } from 'react-router-dom';
/* Styles */
import '../assets/scss/404.scss';

import PageTitle from '../templates/PageTitle';
import Header from '../templates/Header';

export default class Component404 extends Component {
  render() {
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
}