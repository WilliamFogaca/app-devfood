import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
    try {
      get(
        'https://receitas.devari.com.br/api/v1/recipe?user=' + props.userData.id,
        props.userData.token
      ).then((response) => {
        setMyRecipes(
          response.data.map((recipe) => (
            <li key={recipe.id}>
              <CardRecipe recipeId={recipe.id} categoryImg={recipe.category.image} categoryName={recipe.category.name} title={recipe.title} description={recipe.description} />
            </li>
          ))
        );
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="root">
      <Header />
      <PageTitle title={'Minhas Receitas'} />
      <div className="content">
        <div className={'loading-area' + (loading ? ' active' : '')}>
          <img src={LoadingGif} />
          <span>Carregando...</span>
        </div>
        <div className="minhas-receitas">
          <div className="container">
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
  userData: store.userData.data
});

export default connect(mapStateToProps)(MyRecipes);

/* Class Component */
// class MyRecipes extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       MyRecipes: [],
//       loading: false
//     }
//     this.renderMyReceipes = this.renderMyReceipes.bind(this);
//   }

//   componentDidMount() {
//     this.renderMyReceipes();
//     this.setState({loading: true});
//   }

//   renderMyReceipes = async () => {
//     try {
//       const response = await get(
//         'https://receitas.devari.com.br/api/v1/recipe?user=' + this.props.userData.id,
//         this.props.userData.token
//       );
//       this.setState({
//         MyRecipes: response.data.map((recipe) => (
//           <li key={recipe.id}>
//             <CardRecipe recipeId={recipe.id} categoryImg={recipe.category.image} categoryName={recipe.category.name} title={recipe.title} description={recipe.description} />
//           </li>
//         ))
//       });
//       this.setState({loading: false});
//     } catch (error) {
//       console.log(error);
//     }
//   }


//   render() {
//     return (
//       <div className="root">
//         <Header />
//         <PageTitle title={'Minhas Receitas'} />
//         <div className="content">
//           <div className={'loading-area' + (this.state.loading ? ' active' : '')}>
//             <img src={LoadingGif} />
//             <span>Carregando...</span>
//           </div>
//           <div className="minhas-receitas">
//             <div className="container">
//               <ul className="receitas-list">
//                 {this.state.MyRecipes}
//                 <li>
//                   <Link to="/adicionar-receita">
//                     <div className="card-receita card-add-receita">
//                       <p className="plus">+</p>
//                       <p className="text">Adicionar Receita</p>
//                     </div>
//                   </Link>
//                 </li>
//               </ul>
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

// export default connect(mapStateToProps)(MyRecipes);