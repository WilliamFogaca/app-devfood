import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* Components */
import Login from '../components/Login';
import Home from '../components/Home';
import MyRecipes from '../components/MyRecipes';
import AddRecipe from '../components/AddRecipe';
import SingleRecipe from '../components/SingleRecipe';
import Component404 from '../components/Component404';

/* Auth Route */
import PrivateRoute from './PrivateRoutes';

/* Routes URLs */
export const loginRoute = '/login';
export const homeRoute = '/';
export const myRecipesRoute = '/minhas-receitas';
export const addRecipeRoute = '/adicionar-receita';
export const singleRecipeRoute = '/receita/:id';
export const editRecipeRoute = '/receita/:id/editar';

const Routes = (props) => {
  const userAuthenticated = props.userData.id !== 0 ? true : false;
  return (
    <Router>
      <Switch>
        <Route path={loginRoute} component={Login} />

        {/* Rotas privadas */}
        <PrivateRoute exact path={homeRoute} component={Home} authenticated={userAuthenticated}/>

        <PrivateRoute path={myRecipesRoute} name="minhas-receitas" component={MyRecipes} authenticated={userAuthenticated} />


        <PrivateRoute path={addRecipeRoute} name="adicionar-receita" component={AddRecipe} authenticated={userAuthenticated} />

        <PrivateRoute exact path={singleRecipeRoute} component={SingleRecipe} authenticated={userAuthenticated} />
        <PrivateRoute path={editRecipeRoute} component={AddRecipe} authenticated={userAuthenticated} />
        {/* Fim rotas privadas */}

        <Route>
          <Component404 />
        </Route>
      </Switch>

    </Router>
  );

}

const mapStateToProps = store => ({
  userData: store.userData.data
});

export default connect(mapStateToProps)(Routes);