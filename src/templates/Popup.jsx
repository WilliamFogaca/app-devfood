import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from "react-router-dom";

/* Redux Actions */
import { LogoutUser } from '../actions/UserActions';
import { HideModal } from '../actions/ModalActions';

/* Service */
import { deleteR } from '../service/API';

const Popup = (props) => {
  let history = useHistory();

  const outsiteClick = (event) => {
    if (event.target.classList.contains('modal')) {
      props.HideModal();
    }
  }

  const deleteRecipe = () => {
    try {
      deleteR(
        'https://receitas.devari.com.br/api/v1/recipe/' + props.modal.recipeId,
        props.userData.token
      ).then((response) => {
        history.push({
          pathname: '/minhas-receitas',
          state: { recipeDeleted: true }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  const actionClick = () => {
    //console.log(props);
    if (props.modal.modalText.isBackLink) {
      /* Go back twice */
      history.go(-2);
      props.HideModal();
    } else {
      if (props.modal.modalText.btn === 'Apagar') {
        props.HideModal();
        deleteRecipe();
      } else {
        props.HideModal();
        props.LogoutUser();
      }
    }
  }

  return (
    <div id="modal" className="modal" onClick={outsiteClick}>
      <div className="modal-area">
        <div className="modal-area-content">
          <span className="close-btn" onClick={props.HideModal}>X</span>
          <div className="text-area">
            <p>{props.modal.modalText.text}</p>
          </div>
          <div className="options-area">
            <button onClick={props.HideModal} className="cancelar-btn">Cancelar</button>
            <button onClick={actionClick} className={'action-btn ' + ((props.modal.modalText.btn === 'Apagar') ? 'action-delete' : '')}>{props.modal.modalText.btn}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateTothis = store => ({
  userData: store.userData.data,
  modal: store.modal
});

const mapDispatchthis = dispatch => bindActionCreators({ LogoutUser, HideModal }, dispatch);

export default connect(mapStateTothis, mapDispatchthis)(Popup);