import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Login from '../components/Login';
import Home from '../components/Home';
import MyRecipes from '../components/MyRecipes';
import AddRecipe from '../components/AddRecipe';
import SingleRecipe from '../components/SingleRecipe';
import Component404 from '../components/Component404';

import PrivateRoute from './PrivateRoutes';

const Routes = (props) => {
  const userAuthenticated = props.userData.id !== 0 ? true : false;
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        {/* Rotas privadas */}

        <PrivateRoute exact path="/" component={Home} authenticated={userAuthenticated}/>

        <PrivateRoute path="/minhas-receitas" name="minhas-receitas" component={MyRecipes} authenticated={userAuthenticated} />


        <PrivateRoute path="/adicionar-receita" name="adicionar-receita" component={AddRecipe} authenticated={userAuthenticated} />

        <PrivateRoute exact path="/receita/:id" component={SingleRecipe} authenticated={userAuthenticated} />
        <PrivateRoute path="/receita/:id/editar" component={AddRecipe} authenticated={userAuthenticated} />

        

        <Route>
          <Component404 />
        </Route>
        {/* Fim rotas privadas */}
      </Switch>

    </Router>
  );

}

const mapStateToProps = store => ({
  userData: store.userData.data
});

export default connect(mapStateToProps)(Routes);