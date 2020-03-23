import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* Components */
import PageTitle from '../templates/PageTitle';
import Header from '../templates/Header';
import CardRecipe from '../templates/CardRecipe';

/* Service */
import { get } from '../service/API';

/* IMGs */
import LoadingGif from '../assets/img/loading.gif';


const Home = (props) => {

  const [Recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      const response = await get(
        'api/v1/recipe',
        props.userData.token
      );
      setRecipes(
        response.data.map((recipe) => (
          <li key={recipe.id}>
            <CardRecipe recipeId={recipe.id} categoryImg={recipe.category.image} categoryName={recipe.category.name} title={recipe.title} description={recipe.description} />
          </li>
        ))
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="root">
      <Header />
      <PageTitle title={'Receitas'} />
      <div className="content">
        <div className={'loading-area' + (loading ? ' active' : '')}>
          <img src={LoadingGif} />
          <span>Carregando...</span>
        </div>
        <div className="home">
          <div className="container">
            <ul className="receitas-list">
              {Recipes}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = store => ({
  userData: store.userData.data
});

export default connect(mapStateToProps)(Home);