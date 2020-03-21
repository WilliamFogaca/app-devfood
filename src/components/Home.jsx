import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Styles */
import '../assets/scss/Home.scss';

/* Components */
import PageTitle from '../templates/PageTitle';
import Header from '../templates/Header';
import CardRecipe from '../templates/CardRecipe';

/* Service */
import { getList } from '../service/API';


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Recipes: []
    }
    this.renderReceipes = this.renderReceipes.bind(this);
  }

  componentDidMount() {
    this.renderReceipes();
  }

  renderReceipes = async () => {
    try {
      const response = await getList(
        'https://receitas.devari.com.br/api/v1/recipe',
        this.props.userData.token
      );
      this.setState({
        Recipes: response.data.map((recipe) => (
          <li key={recipe.id}>
            <CardRecipe recipeId={recipe.id} categoryImg={recipe.category.image} categoryName={recipe.category.name} title={recipe.title} description={recipe.description} />
          </li>
        ))
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="root">
        <Header />
        <PageTitle title={'Receitas'} />
        <div className="content">
          <div className="home">
            <div className="container">
              <ul className="receitas-list">
                {this.state.Recipes}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  userData: store.userData.data
});

export default connect(mapStateToProps)(Home);