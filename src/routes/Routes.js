import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from '../components/Login';
import Home from '../components/Home';
import MyRecipes from '../components/MyRecipes';
import AddRecipe from '../components/AddRecipe';
import SingleRecipe from '../components/SingleRecipe';
import Component404 from '../components/Component404';

import PrivateRoute from './PrivateRoutes';

class Routes extends Component {
  render() {
    const userAuthenticated = this.props.userData.id !== 0 ? true : false;
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute exact path="/" component={Home} authenticated={userAuthenticated} />
          <PrivateRoute path="/minhas-receitas" component={MyRecipes} authenticated={userAuthenticated} />
          <PrivateRoute path="/adicionar-receita" component={AddRecipe} authenticated={userAuthenticated} />
          <PrivateRoute path="/receita/:id" component={SingleRecipe} authenticated={userAuthenticated} />
          <PrivateRoute path="/receita/edit/:id" component={AddRecipe} authenticated={userAuthenticated} />
          <Route path="*" component={Component404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = store => ({
  userData: store.userData.data
});

export default connect(mapStateToProps)(Routes);