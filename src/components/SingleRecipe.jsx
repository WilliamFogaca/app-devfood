import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Styles */
import '../assets/scss/SingleRecipe.scss';

import PageTitle from '../templates/PageTitle';
import Header from '../templates/Header';

/* Service */
import { getList } from '../service/API';


class SingleRecipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Recipe: []
    }
    this.renderRecipe = this.renderRecipe.bind(this);
  }

  componentDidMount() {
    this.renderRecipe();
  }

  renderRecipe = async () => {
    try {
      const response = await getList(
        'https://receitas.devari.com.br/api/v1/recipe/' + this.props.match.params.id,
        this.props.userData.token,
      );
      this.setState({
        Recipe: response.data
      });
    } catch (error) {
      console.log(error);
    }
  }


  render() {
    return (
      <div className="root">
        <Header />
        <PageTitle title={this.state.Recipe.title} backLink={true} openModal={false} />
        <div className="content">
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  userData: store.userData.data
});

export default connect(mapStateToProps)(SingleRecipe);
