import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { useHistory } from "react-router-dom";

/* Actions */
import { ShowModal } from '../actions/ModalActions';

const PageTitle = (props) => {
  let history = useHistory();
  let backLink = '';
  let recipeOptions = '';
  
  if (props.backLink) {
    backLink = <div className="back-link">
      <a href="#" onClick={() => props.openModal ? props.ShowModal('Descartar', 'Tem certeza que deseja Descartar?', true, history) : history.goBack()}>&#8592; Voltar</a>
    </div>;
  }
  if(props.recipeOptions) {
    recipeOptions = <div className="recipe-options">
      <Link className="option-link edit-option" to={'/receita/edit/' + props.recipeOptions}>Editar</Link>
      <Link className="option-link delete-option" to={'/receita/delete/' + props.recipeOptions}>Apagar</Link>
    </div>
  }

  return (
    <div className="page-title">
      <div className="container">
        {backLink}
        <h2>{props.title}</h2>
        {recipeOptions}
      </div>
    </div>
  )
}

const mapStateToProps = store => ({
  modal: store.modal
});

const mapDispatchProps = dispatch => bindActionCreators({ ShowModal }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(PageTitle);