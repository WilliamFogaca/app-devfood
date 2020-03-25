import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";

/* Components */
import PageTitle from '../templates/PageTitle';
import Header from '../templates/Header';
import ErrorMessage from '../templates/ErrorMessage';
import Loading from '../templates/Loading';

/* Service */
import { get } from '../service/API';

const SingleRecipe = props => {
  let { id } = useParams();
  const [errorMessage, setErrorMessage] = useState({});
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
    getRecipe();
  }, []);

  const getRecipe = async () => {
    setLoading(true);
    try {
      const response = await get(
        'https://receitas.devari.com.br/api/v1/recipe/' + id,
        props.userData.token,
      );
      setRecipe(response.data);
      setLoading(false);
    } catch (error) {
      const { response } = error;
      const responseErrors = JSON.parse(response.request.response);
      Object.keys(responseErrors).forEach(function (item) {
        setErrorMessage({ key: item, message: responseErrors[item] });
      });
      setLoading(false);
    }
  }

  return (
    <div className="root">
      <Header />
      <PageTitle title={`Receita: ${recipe.title}`} backLink={true} openModal={false} recipeOptions={(recipe.user.id === props.userData.id) ? id : false} />
      <div className="content">

        {loading ? <Loading /> : ''}

        <div className="single-recipe">
          <div className="container">
            {errorMessage.key === 'detail' ? <ErrorMessage message={errorMessage.message} /> : ''}

            {(Object.keys(errorMessage).length === 0 && !loading) ?
              <div className="card-single-recipe">
                <div className="img-area">
                  <div className="recipe-img" style={{ backgroundImage: `url(${recipe.category.image})` }}></div>
                  <div className="category-area">
                    <span>{recipe.category.name}</span>
                  </div>
                </div>
                <div className="description-area">
                  <h3 className="title-description-area">Descrição</h3>
                  <p className="recipe-description">{recipe.description}</p>
                </div>
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

export default connect(mapStateToProps)(SingleRecipe);