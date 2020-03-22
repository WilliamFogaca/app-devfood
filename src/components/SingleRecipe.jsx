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

  const [recipeId] = useState(7);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      get(
        'https://receitas.devari.com.br/api/v1/recipe/' + id,
        props.userData.token,
      ).then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCategoryImage(response.data.category.image);
        setCategoryName(response.data.category.name);
        setUser(response.data.user);

        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="root">
      <Header />
      <PageTitle title={`Receita: ${title}`} backLink={true} openModal={false} recipeOptions={(user.id === props.userData.id) ? recipeId : false} />
      <div className="content">
        <div className={'loading-area' + (loading ? ' active' : '')}>
          <img src={LoadingGif} />
          <span>Carregando...</span>
        </div>
        <div className={'single-recipe' + ((!loading) ? ' active' : '')}>
          <div className="container">
            <div className="card-single-recipe">
              <div className="img-area">
                <div className="recipe-img" style={{backgroundImage: `url(${categoryImage})`}}></div>
                <div className="category-area">
                  <span>{categoryName}</span>
                </div>
              </div>
              <div className="description-area">
                <h3 className="title-description-area">Descrição</h3>
                <p className="recipe-description">{description}</p>
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

/* Class Component */
// class SingleRecipe extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       recipeId: 0,
//       title: '',
//       description: '',
//       categoryImage: '',
//       categoryName: '',
//       user: {},

//     }
//     this.renderRecipe = this.renderRecipe.bind(this);
//   }

//   componentDidMount() {
//     this.renderRecipe();
//   }

//   renderRecipe = async () => {
//     try {
//       const response = await get(
//         'https://receitas.devari.com.br/api/v1/recipe/' + this.state.recipeId,
//         this.props.userData.token,
//       );
//       this.setState({
//         title: response.data.title,
//         description: response.data.description,
//         categoryImage: response.data.category.image,
//         categoryName: response.data.category.name,
//         user: response.data.user
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   render() {
//     return (
//       <div className="root">
//         <Header />
//         <PageTitle title={this.state.title} backLink={true} openModal={false} recipeOptions={(this.state.user.id === this.props.userData.id) ? this.state.recipeId : false} />
//         <div className="content">
//           <div className="single-recipe">
//             <div className="card-single-recipe">
//               <div className="img-area">
//                 <img src={this.state.categoryImage} alt={this.state.title} />
//               </div>
//               <div className="description-area">
//                 <h3>Descrição</h3>
//                 <p>{this.state.description}</p>
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

// export default connect(mapStateToProps)(SingleRecipe);
