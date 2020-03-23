import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

/* Components */
import PageTitle from '../templates/PageTitle';
import Header from '../templates/Header';
import CardRecipe from '../templates/CardRecipe';

/* Service */
import { get } from '../service/API';


/* IMGs */
import LoadingGif from '../assets/img/loading.gif';

const MyRecipes = (props) => {
  const [MyRecipes, setMyRecipes] = useState([]);
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
      setMyRecipes(
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
      <PageTitle title={'Minhas Receitas'} />
      <div className="content">
        <div className="minhas-receitas">
          <div className="container">

            <div className={'message-result-area error ' + (props.location.state ? props.location.state.recipeDeleted ? 'active' : '' : '')} data-message-area>
              <span>Receita Apagada!</span>
            </div>

            <div className={'loading-area' + (loading ? ' active' : '')}>
              <img src={LoadingGif} />
              <span>Carregando...</span>
            </div>

            <ul className="receitas-list">
              {MyRecipes}
              <li>
                <Link to="/adicionar-receita">
                  <div className="card-receita card-add-receita">
                    <p className="plus">+</p>
                    <p className="text">Adicionar Receita</p>
                  </div>
                </Link>
              </li>
            </ul>
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