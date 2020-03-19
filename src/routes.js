import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NotFoundRoute } from 'react-router-dom';
import { connect } from 'react-redux';

import App from './App';

class Routes extends Component {
  render() {
    var authMinhasReceitas = '';
    var authAdicionarReceita = '';
    if(this.props.userData.id !== 0) {
      authMinhasReceitas = <Route path="/minhas-receitas" component={() => <App page='minhas-receitas' />} />
      authAdicionarReceita = <Route path="/adicionar-receita" component={() => <App page='adicionar-receita' />} />
    }
    return (
      <BrowserRouter>
        <Switch>
          <Route component={() => <App />} />
          <Route path="/" exact component={() => <App />} />
          {authMinhasReceitas}
          {authAdicionarReceita}
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = store => ({
  userData: store.userData.data
});

export default connect(mapStateToProps)(Routes);