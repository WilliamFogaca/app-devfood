import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Components */
import Header from './templates/Header';
import PageTitle from './templates/PageTitle';
import Login from './components/Login'; /* Login component */
import Home from './components/Home'; /* Home component */
import MinhasReceitas from './components/MinhasReceitas'; /* Minhas Receitas component */
import AdicionarReceita from './components/AdicionarReceita'; /* Adicionar Receita component */

/* Styles */
import './assets/scss/App.scss';

class App extends Component {
  
  render() {
    var pageContent = this.props.userData.id !== 0 ? <Home /> : <Login />;
    var pageTitle = this.props.userData.id !== 0 ? 'Receitas' : 'Entre em sua conta';
    var hasBackLink = false;
    if(this.props.page !== undefined) {
      if(this.props.page === 'minhas-receitas') {
        pageContent = <MinhasReceitas />;
        pageTitle = 'Minhas Receitas';
      } else if(this.props.page === 'adicionar-receita') {
        pageContent = <AdicionarReceita />;
        pageTitle = 'Adicionar Receita';
        hasBackLink = true;
      }
    }
    return (
      <div className="root">
        <Header />
        <PageTitle title={pageTitle} backLink={this.props.page === 'adicionar-receita' ? true : false} />
        <div className="content">
          {pageContent}
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  userData: store.userData.data
});

export default connect(mapStateToProps)(App);
