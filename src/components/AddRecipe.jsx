import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Components */
import PageTitle from '../templates/PageTitle';
import Header from '../templates/Header';

/* Service */
import { post, get } from '../service/API';

const AddRecipe = (props) => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(0);
  const [isRecipeCreated, setIsRecipeCreated] = useState(false);
  const [recipeCreated, setRecipeCreated] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    try {
      get(
        'https://receitas.devari.com.br/api/v1/category',
        props.userData.token
      ).then((response) => {
        setCategories(
          response.data.map((cateogry) => (
            <option key={cateogry.id} value={cateogry.id}>{cateogry.name}</option>
          ))
        );
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const createRecipe = (event) => {
    event.preventDefault();
    if(title === '' || description === '' || category === 0) {
      setErrorMessage('Todos os campos são obrigatórios!');
      return;
    } else {
      try {
        post(
          'https://receitas.devari.com.br/api/v1/recipe/',
          {
            title,
            description,
            category,
            user: props.userData.id,
          },
          props.userData.token
        ).then((response) => {
          setRecipeCreated(response.data);
          setIsRecipeCreated(true);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  console.log(category);
  return (
    <div className="root">
      <Header />
      <PageTitle title={'Adicionar Receita'} backLink={true} openModal={true} />
      <div className="content">
        <div className="adicionar-receita">
          <div className="container">
            <div className="form-area">
              <form onSubmit={createRecipe}>
                <div className="input-area">
                  <input type="text" name="title" id="title" placeholder="Nome da Receita" onChange={() => setTitle(event.target.value)} required />
                </div>
                <div className="input-area">
                  <select name="category" id="category" onChange={() => setCategory(+event.target.value)} required>
                    <option value={0}>Escolha a categoria da receita</option>
                    {categories}
                  </select>
                </div>
                <div className="input-area">
                  <label htmlFor="description">Descrição</label>
                  <textarea name="description" id="description" placeholder="Descrição da Receita" onChange={() => setDescription(event.target.value)} required></textarea>
                </div>
                <div className="submit-area">
                  <button className="btn-submit" type="submit">Criar Receita</button>
                </div>

                <div className={'message-result-area error ' + ((errorMessage !== '') ? ' active' : '')}>
                  <span>{errorMessage}</span>
                </div>

                <div className={'message-result-area' + ((isRecipeCreated) ? ' active' : '')}>
                  <span>Receita criada com sucesso</span>
                </div>

                <div className={'link-result-area' + ((isRecipeCreated) ? ' active' : '')}>
                  <Link className="link" to={'/receita/' + recipeCreated.id}>Ver Receita</Link>
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


/* Class Component */
// class AddRecipe extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       Categories: [],
//       title: '',
//       description: '',
//       category: 0,
//       recipeCreated: {},
//       isRecipeCreated: false
//     }
//     this.renderCategories = this.renderCategories.bind(this);
//     this.changeState = this.changeState.bind(this);
//     this.createRecipe = this.createRecipe.bind(this);
//   }

//   componentDidMount() {
//     this.renderCategories();
//   }

//   changeState = (event) => {
//     if (event.target.id === 'title') {
//       this.setState({ title: event.target.value });
//     } else if (event.target.id === 'description') {
//       this.setState({ description: event.target.value });
//     } else if (event.target.id === 'category') {
//       this.setState({ category: +event.target.value });
//     } else {
//       return false
//     }
//   }

//   renderCategories = async () => {
//     try {
//       const response = await get(
//         'https://receitas.devari.com.br/api/v1/category',
//         this.props.userData.token
//       );
//       this.setState({
//         Categories: response.data.map((cateogry) => (
//           <option key={cateogry.id} value={cateogry.id}>{cateogry.name}</option>
//         ))
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   createRecipe = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await post(
//         'https://receitas.devari.com.br/api/v1/recipe/',
//         {
//           title: this.state.title,
//           description: this.state.description,
//           category: this.state.category,
//           user: this.props.userData.id,
//         },
//         this.props.userData.token
//       );
//       this.setState({ recipeCreated: response.data });
//       this.setState({ isRecipeCreated: true });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   render() {
//     return (
//       <div className="root">
//         <Header />
//         <PageTitle title={'Adicionar Receita'} backLink={true} openModal={true} />
//         <div className="content">
//           <div className="adicionar-receita">
//             <div className="container">

//               <div className="form-area">
//                 <form onSubmit={this.createRecipe}>
//                   <div className="input-area">
//                     <input type="text" name="title" id="title" placeholder="Nome da Receita" onChange={this.changeState} required />
//                   </div>
//                   <div className="input-area">
//                     <select name="category" id="category" onChange={this.changeState} required>
//                       <option>Escolha a categoria da receita</option>
//                       {this.state.Categories}
//                     </select>
//                   </div>
//                   <div className="input-area">
//                     <label htmlFor="description">Descrição</label>
//                     <textarea name="description" id="description" placeholder="Descrição da Receita" onChange={this.changeState} required></textarea>
//                   </div>
//                   <div className="submit-area">
//                     <button className="btn-submit" type="submit">Criar Receita</button>
//                   </div>

//                   <div className={'message-result-area' + ((this.state.isRecipeCreated) ? ' active' : '')}>
//                     <span>Receita criada com sucesso</span>
//                   </div>

//                   <div className={'link-result-area' + ((this.state.isRecipeCreated) ? ' active' : '')}>
//                     <Link className="link" to={'/receita/' + this.state.recipeCreated.id}>Ver Receita</Link>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//     )
//   }
// }

// const mapStateToProps = store => ({
//   userData: store.userData.data
// });

// export default connect(mapStateToProps)(AddRecipe);