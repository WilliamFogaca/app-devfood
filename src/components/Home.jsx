import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* Components */
import PageTitle from '../templates/PageTitle';
import Header from '../templates/Header';
import CardRecipe from '../templates/CardRecipe';
import Loading from '../templates/Loading';

/* Service */
import { get } from '../service/API';

const Home = props => {
  const [offset, setOffset] = useState(6);
  const [AllRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getRecipes = async () => {
      try {
        const response = await get(
          'api/v1/recipe',
          props.userData.token
        );
        setAllRecipes(response.data);
        setLoading(false);

      } catch (error) {
        console.log(error);
      }
    }
    getRecipes();
  }, [props]);


  const loadMorerecipes = (event) => {
    event.preventDefault();
    setOffset(offset + 6);
  }

  return (
    <div className="root">
      <Header />
      <PageTitle title={'Receitas'} />
      <div className="content" id="content">

        {loading ? <Loading /> : ''}

        <div className="home">
          <div className="container">
            <ul className="receitas-list" data-recipe-list>
              {AllRecipes.map((recipe, index) => {
                return (index < offset) ?
                  <li key={recipe.id}>
                    <CardRecipe recipeId={recipe.id} categoryImg={recipe.category.image} categoryName={recipe.category.name} title={recipe.title} description={recipe.description} />
                  </li>
                : '';
              })}
            </ul>
            {offset < AllRecipes.length ?
              <div className="btn-load-more">
                <button onClick={loadMorerecipes}>Mostrar mais</button>
              </div>
              : ''}
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