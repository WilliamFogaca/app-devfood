import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

/* Components */
import Popup from './Popup';

/* Routes URLs */
import { homeRoute, myRecipesRoute, addRecipeRoute } from '../routes/Routes';

/* Actions */
import { ShowModal } from '../actions/ModalActions';

const Header = (props) => {
  return (
    <div className="header">
      <div className="header-top">
        <div className="container">
          <div className="logo-area">
            <Link to={homeRoute}>
              <h1>DEV<span>food</span></h1>
            </Link>
          </div>
          {props.userData.id !== 0 ?
            <>
              <ul className="menu-area">
                <li>
                  <Link to={homeRoute}>Receitas</Link>
                </li>
                <li>
                  <Link to={myRecipesRoute}>Minhas Receitas</Link>
                </li>
                <li>
                  <Link to={addRecipeRoute}>Adicionar Receitas</Link>
                </li>
              </ul>
              <div className="user-options">
                <span className="user-name">{props.userData.name}</span>
                <img src={props.userData.image} className="user-img" alt="Imagem do usuário" />
                <span className="separator"></span>
                <a onClick={() => props.ShowModal('Sair', 'Tem certeza que deseja sair?', false)} className="logout">Sair</a>
              </div>
            </>
            : ''}
        </div>
      </div>
      <div className="header-bottom"></div>

      {/* Show Popup */}
      {props.modal.showModal ? <Popup /> : ''}
    </div>
  )
}

const mapStateToProps = store => ({
  userData: store.userData.data,
  modal: store.modal
});

const mapDispatchProps = dispatch => bindActionCreators({ ShowModal }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Header);