import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* Components */
import PageTitle from '../templates/PageTitle';
import Header from '../templates/Header';
import CardRecipe from '../templates/CardRecipe';

/* Service */
import { get } from '../service/API';

/* IMGs */
import LoadingGif from '../assets/img/loading.gif';


const Home = (props) => {
  const [Recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      get(
        'https://receitas.devari.com.br/api/v1/recipe',
        props.userData.token
      ).then((response) => {
        setRecipes(
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
      <PageTitle title={'Receitas'} />
      <div className="content">
        <div className={'loading-area' + (loading ? ' active' : '')}>
          <img src={LoadingGif} />
          <span>Carregando...</span>
        </div>
        <div className="home">
          <div className="container">
            <ul className="receitas-list">
              {Recipes}
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

export default connect(mapStateToProps)(Home);

// class Home extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       Recipes: [],
//       loading: false
//     }
//     this.renderReceipes = this.renderReceipes.bind(this);
//   }

//   componentDidMount() {
//     this.renderReceipes();
//   }

//   renderReceipes = async () => {
//     this.setState({loading: true});
//     try {
//       const response = await get(
//         'https://receitas.devari.com.br/api/v1/recipe',
//         this.props.userData.token
//       );
//       this.setState({
//         Recipes: response.data.map((recipe) => (
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
//         <PageTitle title={'Receitas'} />
//         <div className="content">
//           <div className={'loading-area' + (this.state.loading ? ' active' : '')}>
//             <img src={LoadingGif} />
//             <span>Carregando...</span>
//           </div>
//           <div className="home">
//             <div className="container">
//               <ul className="receitas-list">
//                 {this.state.Recipes}
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

// export default connect(mapStateToProps)(Home);