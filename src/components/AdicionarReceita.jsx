import React, { Component } from 'react';
/* Styles */
import '../assets/scss/AdicionarReceita.scss';

export default class AdicionarReceita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  render() {
    return (
      <div className="adicionar-receita">
        <div className="container">
          <div className="form-area">
            <form onSubmit="">
              <div className="input-area">
                <input type="text" name="title" id="title" placeholder="Nome da Receita" />
              </div>
              <div className="input-area">
                <select name="category" id="category">
                  <option>Escolha a categoria da receita</option>
                  <option value="categoria-1">Categoria 1</option>
                  <option value="categoria-2">Categoria 2</option>
                  <option value="categoria-3">Categoria 3</option>
                </select>
              </div>
              <div className="input-area">
                <label htmlFor="description">Descrição</label>
                <textarea name="description" id="description" placeholder="Descrição da Receita"></textarea>
              </div>
              <div className="submit-area">
                <button className="btn-submit" type="submit">Criar Receita</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}