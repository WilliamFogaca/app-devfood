import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './components/Login';
import Home from './components/Home';
import MyRecipes from './components/MyRecipes';
import AddRecipe from './components/AddRecipe';
import SingleRecipe from './components/SingleRecipe';
import Component404 from './components/Component404';

class Routes extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={this.props.userData.id !== 0 ? Home : Login} />
            <Route path="/minhas-receitas" component={this.props.userData.id !== 0 ? MyRecipes : Login} />
            <Route path="/adicionar-receita" component={this.props.userData.id !== 0 ? AddRecipe : Login} />
            <Route path="/receita/:id" component={this.props.userData.id !== 0 ? SingleRecipe : Login} />
            <Route component={Component404} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  userData: store.userData.data,
});

export default connect(mapStateToProps)(Routes);