import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

/* Actions */
import { ShowModal } from '../actions/ModalActions';

class Header extends Component {
  
  render() {
    var userInfos = '';
    var authMenu = '';
    if (this.props.userData.id !== 0) {
      userInfos = <div className="user-options">
        <span className="user-name">{this.props.userData.name}</span>
        <img src={this.props.userData.image} className="user-img" alt="Imagem do usuário" />
        <span className="separator"></span>
        <a onClick={() => this.props.ShowModal('Sair', 'Tem certeza que deseja sair?', false)} className="logout">Sair</a>
      </div>

      authMenu = <ul className="menu-area">
        <li>
          <Link to="/">Receitas</Link>
        </li>
        <li>
          <Link to="/minhas-receitas">Minhas Receitas</Link>
        </li>
        <li>
          <Link to="/adicionar-receita">Adicionar Receitas</Link>
        </li>
      </ul>
    }
    return (
      <div className="header">
        <div className="header-top">
          <div className="container">
            <div className="logo-area">
              <Link to="/">
                <h1>DEV<span>food</span></h1>
              </Link>
            </div>
            {authMenu}
            {userInfos}
          </div>
        </div>
        <div className="header-bottom"></div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  userData: store.userData.data,
  modal: store.modal
});

const mapDispatchProps = dispatch => bindActionCreators({ ShowModal }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Header);