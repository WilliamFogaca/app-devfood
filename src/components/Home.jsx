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
    getRecipes();
  }, []);

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
                if (index < offset) {
                  return (
                    <li key={recipe.id}>
                      <CardRecipe recipeId={recipe.id} categoryImg={recipe.category.image} categoryName={recipe.category.name} title={recipe.title} description={recipe.description} />
                    </li>
                  );
                }
              })}
            </ul>
            {offset < AllRecipes.length ?
              <div className="btn-load-more">
                <a onClick={loadMorerecipes}>Mostrar mais</a>
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