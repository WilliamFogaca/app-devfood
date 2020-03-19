import React, { Component } from 'react';
/* Styles */
import '../assets/scss/Home.scss';

/* IMGs */
import CardImg from '../assets/img/card-receita-img.png';


export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="container">
          <ul className="receitas-list">
            <li>
              <a href="#">
                <div className="card-receita">
                  <div className="img-area">
                    <img src={CardImg} alt=""/>
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
                    <img src={CardImg} alt=""/>
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
                    <img src={CardImg} alt=""/>
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
                    <img src={CardImg} alt=""/>
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
          </ul>
        </div>
      </div>
    )
  }
}