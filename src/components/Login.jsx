import React, { Component } from 'react';
import axios from 'axios';
import regeneratorRuntime from 'regenerator-runtime';

/* Styles */
import '../assets/scss/Login.scss';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    //this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUserNameChange = (event) => {
    this.setState({ username: event.target.value });
  }
  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        method: 'post',
        url: 'https://receitas.devari.com.br/authentication/',
        data: this.state,
      });

      console.log(response);
    } catch(err) {
      console.warn('Erro: ' + err);
    }
  }

  render() {
    return (
      <div className="login-area">
        <div className="card-login">
          <form onSubmit={this.handleLogin}>
            <div className="input-area">
              <label htmlFor="email">E-mail</label>
              <input type="text" name="email" id="email" placeholder="exemplo@exemplo.com" onChange={this.handleUserNameChange} required />
            </div>
            <div className="input-area">
              <label htmlFor="senha">Senha</label>
              <input type="password" name="senha" id="senha" placeholder="*************" onChange={this.handlePasswordChange} required />
            </div>
            <div className="submit-area">
              <button className="btn-submit" type="submit">Entrar</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}