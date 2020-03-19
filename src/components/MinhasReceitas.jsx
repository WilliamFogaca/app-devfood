import React, { Component } from 'react';
import { Link } from 'react-router-dom';
/* Styles */
import '../assets/scss/MinhasReceitas.scss';

/* IMGs */
import CardImg from '../assets/img/card-receita-img.png';

export default class MinhasReceitas extends Component {
  render() {
    return (
      <div className="minhas-receitas">
        <div className="container">
          <ul className="receitas-list">
            <li>
              <a href="#">
                <div className="card-receita">
                  <div className="img-area">
                    <img src={CardImg} alt="" />
                    <div className="card-category">
                      <span>Categoria 1</span>
                    </div>
                  </div>
                  <div className="text-area">
                    <h3 className="card-title">Calabresa</h3>
                    <div className="card-description">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut odio veniam nobis fugit. Velit beatae expedita labore</p>
                    </div>
                    <div className="link-to-receita">
                      <span>Ver receita</span>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="card-receita">
                  <div className="img-area">
                    <img src={CardImg} alt="" />
                    <div className="card-category">
                      <span>Categoria 1</span>
                    </div>
                  </div>
                  <div className="text-area">
                    <h3 className="card-title">Calabresa</h3>
                    <div className="card-description">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut odio veniam nobis fugit. Velit beatae expedita labore</p>
                    </div>
                    <div className="link-to-receita">
                      <span>Ver receita</span>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="card-receita">
                  <div className="img-area">
                    <img src={CardImg} alt="" />
                    <div className="card-category">
                      <span>Categoria 1</span>
                    </div>
                  </div>
                  <div className="text-area">
                    <h3 className="card-title">Calabresa</h3>
                    <div className="card-description">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut odio veniam nobis fugit. Velit beatae expedita labore</p>
                    </div>
                    <div className="link-to-receita">
                      <span>Ver receita</span>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="card-receita">
                  <div className="img-area">
                    <img src={CardImg} alt="" />
                    <div className="card-category">
                      <span>Categoria 1</span>
                    </div>
                  </div>
                  <div className="text-area">
                    <h3 className="card-title">Calabresa</h3>
                    <div className="card-description">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut odio veniam nobis fugit. Velit beatae expedita labore</p>
                    </div>
                    <div className="link-to-receita">
                      <span>Ver receita</span>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <Link to="/adicionar-receita">
                <div className="card-receita card-add-receita">
                  <p className="plus">+</p>
                  <p className="text">Adicionar Receita</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}