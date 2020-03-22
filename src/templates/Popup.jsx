import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Redux Actions */
import { LogoutUser } from '../actions/UserActions';

import { HideModal } from '../actions/ModalActions';

const Popup = (props) => {
  
  const outsiteClick = (event) => {
    if (event.target.classList.contains('modal')) {
      props.HideModal();
    }
  }

  const actionClick = () => {
    if (props.modal.modalText.isBackLink) {
      /* MARCADO PARA AJUSTAR */
      props.modal.history.go(-2);
      /* FIM MARCADO PARA AJUSTAR */
      props.HideModal();
    } else {
      props.HideModal();
      props.LogoutUser();
    }
  }

  return (
    <div id="modal" className={'modal ' + (props.modal.showModal ? 'active' : '')} onClick={outsiteClick}>
      <div className="modal-area">
        <div className="modal-area-content">
          <span className="close-btn" onClick={props.HideModal}>X</span>
          <div className="text-area">
            <p>{props.modal.modalText.text}</p>
          </div>
          <div className="options-area">
            <a onClick={props.HideModal} className="cancelar-btn">Cancelar</a>
            <a onClick={actionClick} className="action-btn">{props.modal.modalText.btn}</a>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateTothis = store => ({
  modal: store.modal
});

const mapDispatchthis = dispatch => bindActionCreators({ LogoutUser, HideModal }, dispatch);

export default connect(mapStateTothis, mapDispatchthis)(Popup);