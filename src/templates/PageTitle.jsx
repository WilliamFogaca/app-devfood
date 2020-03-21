import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { useHistory } from "react-router-dom";

/* Actions */
import { ShowModal } from '../actions/ModalActions';

function PageTitle(props) {
  let history = useHistory();
  let backLink = '';
  if (props.backLink) {
    backLink = <div className="back-link">
      <a href="#" onClick={() => props.openModal ? props.ShowModal('Descartar', 'Tem certeza que deseja Descartar?', true) : history.goBack()}>&#8592; Voltar</a>
    </div>;
  }
  return (
    <div className="page-title">
      <div className="container">
        {backLink}
        <h2>{props.title}</h2>
      </div>
    </div>
  )
}

const mapStateToProps = store => ({
  modal: store.modal
});

const mapDispatchProps = dispatch => bindActionCreators({ ShowModal }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(PageTitle);