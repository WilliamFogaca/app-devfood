import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Styles */
import '../assets/scss/AdicionarReceita.scss';

/* Components */
import PageTitle from '../templates/PageTitle';
import Header from '../templates/Header';

/* Service */
import { getList } from '../service/API';


class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Categories: []
    }
    this.renderCategories = this.renderCategories.bind(this);
  }

  componentDidMount() {
    this.renderCategories();
  }

  renderCategories = async () => {
    try {
      const response = await getList(
        'https://receitas.devari.com.br/api/v1/category',
        this.props.userData.token
      );
      this.setState({
        Categories: response.data.map((cateogry) => (
          <option key={cateogry.id} value={cateogry.id}>{cateogry.name}</option>
        ))
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="root">
        <Header />
        <PageTitle title={'Adicionar Receita'} backLink={true} openModal={true} />
        <div className="content">
          <div className="adicionar-receita">
            <div className="container">
              <div className="form-area">
                <form onSubmit={this.createRecipe}>
                  <div className="input-area">
                    <input type="text" name="title" id="title" placeholder="Nome da Receita" />
                  </div>
                  <div className="input-area">
                    <select name="category" id="category" data-categories>
                      <option>Escolha a categoria da receita</option>
                      {this.state.Categories}
                    </select>
                  </div>
                  <div className="input-area">
                    <label htmlFor="description">Descrição</label>
                    <textarea name="description" id="description" placeholder="Descrição da Receita"></textarea>
                  </div>
                  <div className="submit-area">
                    <button className="btn-submit" type="submit">Criar Receita</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = store => ({
  userData: store.userData.data
});

export default connect(mapStateToProps)(AddRecipe);