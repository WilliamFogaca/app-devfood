import React from 'react';

/* IMGs */
import UserImg from'../assets/img/user-img.png';

export default props => (
  <div className="header">
    <div className="header-top">
      <div className="container">
        <div className="logo-area">
          <a href="teste">
            <h1>DEV<span>food</span></h1>
          </a>
        </div>
        <ul className="menu-area">
          <li>
            <a href="teste">Receitas</a>
          </li>
          <li>
            <a href="teste">Minhas Receitas</a>
          </li>
          <li>
            <a href="teste">Adicionar Receitas</a>
          </li>
        </ul>
        <div className="user-options">
          <span className="user-name">Nome da silva</span>
          <img src={UserImg} className="user-img" alt="Imagem do usuário"/>
          <span className="separator"></span>
          <a href="teste" className="logout">Sair</a>
        </div>
      </div>
    </div>
    <div className="header-bottom"></div>
  </div>
)