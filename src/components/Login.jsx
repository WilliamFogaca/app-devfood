import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Redirect } from 'react-router-dom';

/* Redux Actions */
import { LoginUser } from '../actions/UserActions';

/* Service */
import { auth } from '../service/API';

/* Styles */
import '../assets/scss/Login.scss';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }

    this.authenticate = this.authenticate.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  changeUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  changePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  

  authenticate = async (event) => {
    event.preventDefault();
    try {
      const response = await auth(
        'https://receitas.devari.com.br/authentication/',
        {
          username: this.state.username,
          password: this.state.password,
        }
      );
      this.props.LoginUser(response.id, response.name, response.image, response.email, response.token);

    } catch (error) {
      const { response } = error;
      const { request, ...errorObject } = response;

      const containerError = document.querySelector('[data-error-message]');
      containerError.classList.add('active');
      containerError.innerHTML = `<span>${JSON.parse(response.request.response).non_field_errors[0]}</span>`;
    }
  }

  render() {
    return (
      <div className="login-area">
        <div className="card-login">
          <form onSubmit={this.authenticate}>
            <div className="input-area">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" placeholder="exemplo@exemplo.com" onChange={this.changeUsername} required />
            </div>
            <div className="input-area">
              <label htmlFor="senha">Senha</label>
              <input type="password" name="senha" id="senha" placeholder="*************" onChange={this.changePassword} required />
            </div>
            <div className="submit-area">
              <button className="btn-submit" type="submit">Entrar</button>
            </div>
            <div className="error-messages" data-error-message></div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  userData: store.userData.data
});

const mapDispatchProps = dispatch => bindActionCreators({ LoginUser }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Login);