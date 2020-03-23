import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

/* Components */
import PageTitle from '../templates/PageTitle';
import Header from '../templates/Header';

/* Service */
import { post, get, patch } from '../service/API';

const AddRecipe = (props) => {

  /* Editar Receita */
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [isRecipeCreatedOrEdited, setIsRecipeCreatedOrEdited] = useState(false);
  const [recipeCreatedOrEdited, setRecipeCreatedOrEdited] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const recipeInitialState = {
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
  };
  const [recipe, setRecipe] = useState(recipeInitialState);

  useEffect(() => {
    getAllCategories();
    if (id) {
      getSingleRecipe();
    }
  }, []);

  const getAllCategories = async () => {
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
    } catch (error) {
      console.log(error);
      setErrorMessage(`Erro: ${error}`);
    }
  }

  const getSingleRecipe = async () => {
    try {
      const response = await get(
        `api/v1/recipe/${id}`,
        props.userData.token
      );
      setRecipe(response.data);
    } catch (error) {
      console.log(error);
      setErrorMessage(`Erro: ${error}`);
    }
  }

  const createOrEditRecipe = async (event) => {
    event.preventDefault();
    if (title === '' || description === '' || category === 0) {
      setErrorMessage('Todos os campos são obrigatórios!');
      return;
    } else {
      try {
        let responseResult = {};
        if (id) {
          const response = await patch(
            `api/v1/recipe/${id}`,
            {
              title: recipe.title,
              description: recipe.description,
              category: recipe.category.id,
              user: {
                id: props.userData.id
              }
            },
            props.userData.token
          );
          responseResult = response.data;
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
        }

        setRecipeCreatedOrEdited(responseResult);
        setIsRecipeCreatedOrEdited(true);
      } catch (error) {
        console.log(error);
        setErrorMessage(`Erro: ${error}`);
      }
    }
  }

  console.log(props.userData.token);

  return (
    <div className="root">
      <Header />
      <PageTitle title={(id ? 'Editar' : 'Criar') + ' Receita'} backLink={true} openModal={true} />
      <div className="content">
        <div className="adicionar-receita">
          <div className="container">
            <div className="form-area">
              <form onSubmit={createOrEditRecipe}>
                <div className="input-area">
                  <input type="text" name="title" id="title" placeholder="Nome da Receita" onChange={() => setRecipe({...recipe, title: event.target.value})} value={(id || recipe.title) ? recipe.title : ''} required />
                </div>
                <div className="input-area">
                  <select name="category" id="category" onChange={() => setRecipe({...recipe, category: {id: event.target.value}})} value={(id || recipe.title) ? recipe.category.id : 0} required>
                    <option value={0}>Escolha a categoria da receita</option>
                    {categories}
                  </select>
                </div>
                <div className="input-area">
                  <label htmlFor="description">Descrição</label>
                  <textarea name="description" id="description" placeholder="Descrição da Receita" onChange={() => setRecipe({...recipe, description: event.target.value})} value={(id || recipe.title) ? recipe.description : ''} required></textarea>
                </div>
                <div className="submit-area">
                  <button className="btn-submit" type="submit">{id ? 'Editar' : 'Criar'} Receita</button>
                </div>

                <div className={'message-result-area error ' + ((errorMessage !== '') ? ' active' : '')}>
                  <span>{errorMessage}</span>
                </div>

                <div className={'message-result-area' + ((isRecipeCreatedOrEdited) ? ' active' : '')}>
                  <span>Receita criada com sucesso</span>
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