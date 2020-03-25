import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, useHistory } from 'react-router-dom';
import { generatePath } from "react-router";

/* Actions */
import { ShowModal } from '../actions/ModalActions';

/* Routes URLs */
import { editRecipeRoute } from '../routes/Routes';

const PageTitle = (props) => {
  let history = useHistory();

  return (
    <div className="page-title">
      <div className="container">

        {props.backLink ?
          <div className="back-link">
            <button href="#" onClick={() => props.openModal ? props.ShowModal('Descartar', 'Tem certeza que deseja Descartar?', true) : history.goBack()}>&#8592; Voltar</button>
          </div>
          : ''}

        <h2>{props.title}</h2>

        {props.recipeOptions ?
          <div className="recipe-options">
            <Link className="option-link edit-option" to={generatePath(editRecipeRoute, { id: props.recipeOptions })}>Editar</Link>
            <button className="option-link delete-option" onClick={() => props.ShowModal('Apagar', 'Tem certeza que deseja Apagar?', false, props.recipeOptions)}>Apagar</button>
          </div>
          : ''}

      </div>
    </div>
  )
}

const mapStateToProps = store => ({
  modal: store.modal
});

const mapDispatchProps = dispatch => bindActionCreators({ ShowModal }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(PageTitle);