import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Redux Actions */
import { LogoutUser } from '../actions/UserActions';

import { HideModal } from '../actions/ModalActions';

class Popup extends Component {

  outsiteClick = (event) => {
    if (event.target.classList.contains('modal')) {
      this.props.HideModal();
    }
  }

  actionClick = () => {

    if (this.props.modal.modalText.isBackLink) {
      this.props.HideModal();
    } else {
      this.props.HideModal();
      this.props.LogoutUser();
    }
  }

 

  render() {
    console.log(this.props);
    return (
      <div id="modal" className={'modal ' + (this.props.modal.showModal ? 'active' : '')} onClick={this.outsiteClick}>
        <div className="modal-area">
          <div className="modal-area-content">
            <span className="close-btn" onClick={this.props.HideModal}>X</span>
            <div className="text-area">
              <p>{this.props.modal.modalText.text}</p>
            </div>
            <div className="options-area">
              <a onClick={this.props.HideModal} className="cancelar-btn">Cancelar</a>
              <a onClick={this.actionClick} className="action-btn">{this.props.modal.modalText.btn}</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  
}

const mapStateTothis = store => ({
  modal: store.modal
});

const mapDispatchthis = dispatch => bindActionCreators({ LogoutUser, HideModal }, dispatch)

export default connect(mapStateTothis, mapDispatchthis)(Popup);