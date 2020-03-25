import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Components */
import PageTitle from '../templates/PageTitle';
import Header from '../templates/Header';
import CardRecipe from '../templates/CardRecipe';
import Loading from '../templates/Loading';
import ErrorMessage from '../templates/ErrorMessage';

/* Routes URLs */
import { addRecipeRoute } from '../routes/Routes';

/* Service */
import { get } from '../service/API';

const MyRecipes = props => {
  const initialOffset = 5;

  const [AllMyRecipes, setAllMyRecipes] = useState([]);
  const [offset, setOffset] = useState(initialOffset);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMyRecipes();
  }, []);

  const getMyRecipes = async () => {
    try {
      const response = await get(
        'api/v1/recipe?user=' + props.userData.id,
        props.userData.token
      );
      setAllMyRecipes(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const loadMorerecipes = (event) => {
    event.preventDefault();
    setOffset(offset + initialOffset);
  }

  return (
    <div className="root">
      <Header />
      <PageTitle title={'Minhas Receitas'} />
      <div className="content">
        <div className="minhas-receitas">
          <div className="container">

            {props.location.state ? props.location.state.recipeDeleted ?
              <ErrorMessage message={'Receita Apagada!'} />
            : '' : ''}

            {loading ? <Loading /> : ''}

            <ul className="receitas-list">
              {AllMyRecipes.map((recipe, index) => {
                if (index < offset) {
                  return (
                    <li key={recipe.id}>
                      <CardRecipe recipeId={recipe.id} categoryImg={recipe.category.image} categoryName={recipe.category.name} title={recipe.title} description={recipe.description} />
                    </li>
                  );
                }
              })}
              <li>
                <Link to={addRecipeRoute}>
                  <div className="card-receita card-add-receita">
                    <p className="plus">+</p>
                    <p className="text">Adicionar Receita</p>
                  </div>
                </Link>
              </li>
            </ul>

            {offset < AllMyRecipes.length ?
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
  userData: store.userData.data,
  modal: store.modal
});

export default connect(mapStateToProps)(MyRecipes);