import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";

/* Components */
import PageTitle from '../templates/PageTitle';
import Header from '../templates/Header';

/* Service */
import { get } from '../service/API';

/* IMGs */
import LoadingGif from '../assets/img/loading.gif';

const SingleRecipe = (props) => {
  let { id } = useParams();
  const [recipe, setRecipe] = useState({
    id: 0,
    title: '',
    description: '',
    category: {
      name: '',
      image: ''
    },
    user: {
      id: 0
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      get(
        'https://receitas.devari.com.br/api/v1/recipe/' + id,
        props.userData.token,
      ).then((response) => {
        setRecipe(response.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="root">
      <Header />
      <PageTitle title={`Receita: ${recipe.title}`} backLink={true} openModal={false} recipeOptions={(recipe.user.id === props.userData.id) ? id : false} />
      <div className="content">
        <div className={'loading-area' + (loading ? ' active' : '')}>
          <img src={LoadingGif} />
          <span>Carregando...</span>
        </div>
        <div className={'single-recipe' + ((!loading) ? ' active' : '')}>
          <div className="container">
            <div className="card-single-recipe">
              <div className="img-area">
                <div className="recipe-img" style={{backgroundImage: `url(${recipe.category.image})`}}></div>
                <div className="category-area">
                  <span>{recipe.category.name}</span>
                </div>
              </div>
              <div className="description-area">
                <h3 className="title-description-area">Descrição</h3>
                <p className="recipe-description">{recipe.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = store => ({
  userData: store.userData.data
});

export default connect(mapStateToProps)(SingleRecipe);