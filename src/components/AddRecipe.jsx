import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

/* Components */
import PageTitle from '../templates/PageTitle';
import Header from '../templates/Header';
import ErrorMessage from '../templates/ErrorMessage';

/* Service */
import { post, get, put } from '../service/API';

/* IMGs */
import LoadingGif from '../assets/img/loading.gif';

const AddRecipe = (props) => {

  /* Editar Receita */
  const { id } = useParams();

  /* States */
  const [hasPermission, setHasPermission] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isRecipeCreatedOrEdited, setIsRecipeCreatedOrEdited] = useState(false);
  const [recipeCreatedOrEdited, setRecipeCreatedOrEdited] = useState({});

  const [errorMessage, setErrorMessage] = useState({});

  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const recipeInitialState = {
    id: 0,
    title: '',
    description: '',
    category: {
      id: 0,
      name: '',
      image: ''
    },
    user: {
      id: 0
    }
  };
  const [recipe, setRecipe] = useState(recipeInitialState);

  /* UserEffects to get all categories after rendering */
  useEffect(() => {
    if (hasPermission) {
      getAllCategories();
    }
  }, []);

  /* UserEffects to get recipe after rendering if has id */
  useEffect(() => {
    if (id) {
      getSingleRecipe();
    } else {
      setRecipe(recipeInitialState);
      setHasPermission(true);
      setErrorMessage({});
    }
  }, [id]);

  const getAllCategories = async () => {
    setLoading(true);
    try {
      const response = await get(
        'api/v1/category',
        props.userData.token
      );
      setCategories(
        response.data.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))
      );
      setLoading(false);
    } catch (error) {
      const { response } = error;
      const responseErrors = JSON.parse(response.request.response);
      Object.keys(responseErrors).forEach(function (item) {
        setErrorMessage({ key: item, message: responseErrors[item] });
      });
    }
  }

  /* Get recipe for update */
  const getSingleRecipe = async () => {
    setLoading(true);
    try {
      const response = await get(
        `api/v1/recipe/${id}`,
        props.userData.token
      );
      if (response.data.user.id !== props.userData.id) {
        setHasPermission(false);
        setErrorMessage({ key: 'no-permission', message: 'Você não possui permissão para editar essa receita!' });
        return;
      }
      setRecipe(response.data);
      setLoading(false);
    } catch (error) {
      const { response } = error;
      const responseErrors = JSON.parse(response.request.response);
      Object.keys(responseErrors).forEach(function (item) {
        setErrorMessage({ key: item, message: responseErrors[item] });
      });
    }
  }

  /* On Submit form create or update recipe */
  const createOrEditRecipe = async (event) => {
    event.preventDefault();
    if (recipe.title === '' || recipe.description === '' || recipe.category.id === 0) {
      setErrorMessage({ key: 'all-fields-required', message: 'Todos os campos são obrigatórios!' });
      return;
    } else {
      try {
        let responseResult = {};
        if (id) {
          const response = await put(
            `api/v1/recipe/${id}/`,
            {
              title: recipe.title,
              description: recipe.description,
              category: recipe.category.id
            },
            props.userData.token
          );
          responseResult = response.data;
          setSuccessMessage('Receita atualizada com sucesso!');
          setErrorMessage({});
        } else {
          const response = await post(
            'api/v1/recipe/',
            {
              title: recipe.title,
              description: recipe.description,
              category: recipe.category.id,
              user: props.userData.id,
            },
            props.userData.token
          );
          responseResult = response.data;
          setSuccessMessage('Receita criada com sucesso!');
          setErrorMessage({});
        }
        setRecipeCreatedOrEdited(responseResult);
        setIsRecipeCreatedOrEdited(true);
      } catch (error) {
        const { response } = error;
        const responseErrors = JSON.parse(response.request.response);
        Object.keys(responseErrors).forEach(function (item) {
          setErrorMessage({ key: item, message: responseErrors[item] });
        });
      }
    }
  }

  return (
    <div className="root">
      <Header />
      <PageTitle title={(id ? 'Editar' : 'Criar') + ' Receita'} backLink={true} openModal={((successMessage === '' && hasPermission) ? true : false)} />
      <div className="content">
        <div className={'loading-area' + (loading ? ' active' : '')}>
          <img src={LoadingGif} />
          <span>Carregando...</span>
        </div>
        <div className={'adicionar-receita ' + (!(loading) ? 'active' : '')}>
          <div className="container">

            {errorMessage.key === 'no-permission' ? <ErrorMessage message={errorMessage.message} /> : ''}

            <div className={'form-area ' + (hasPermission ? 'active' : '')}>
              <form onSubmit={createOrEditRecipe}>
                <div className="input-area">
                  <input type="text" name="title" id="title" placeholder="Nome da Receita" onChange={(event) => setRecipe({ ...recipe, title: event.target.value })} value={recipe.title} required />

                  {errorMessage.key === 'title' ? <ErrorMessage message={errorMessage.message} /> : ''}
                </div>
                <div className="input-area">
                  <select name="category" id="category" onChange={(event) => setRecipe({ ...recipe, category: { id: event.target.value } })} value={recipe.category.id} required>
                    <option value={0}>Escolha a categoria da receita</option>
                    {categories}
                  </select>

                  {errorMessage.key === 'category' ? <ErrorMessage message={errorMessage.message} /> : ''}

                </div>
                <div className="input-area">
                  <label htmlFor="description">Descrição</label>
                  <textarea name="description" id="description" placeholder="Descrição da Receita" onChange={(event) => setRecipe({ ...recipe, description: event.target.value })} value={recipe.description} required></textarea>
                  
                  {errorMessage.key === 'description' ? <ErrorMessage message={errorMessage.message} /> : ''}
                </div>
                <div className="submit-area">
                  <button className="btn-submit" type="submit">{id ? 'Editar' : 'Criar'} Receita</button>
                </div>

                {errorMessage.key === 'all-fields-required' ? <ErrorMessage message={errorMessage.message} /> : ''}

                <div className={'message-result-area' + ((isRecipeCreatedOrEdited) ? ' active' : '')}>
                  <span>{successMessage}</span>
                </div>

                <div className={'link-result-area' + ((isRecipeCreatedOrEdited) ? ' active' : '')}>
                  <Link className="link" to={'/receita/' + recipeCreatedOrEdited.id}>Ver Receita</Link>
                </div>
              </form>
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

export default connect(mapStateToProps)(AddRecipe);