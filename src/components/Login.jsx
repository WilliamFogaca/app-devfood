import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Redirect } from 'react-router-dom';

/* Components */
import PageTitle from '../templates/PageTitle';
import Header from '../templates/Header';

/* Redux Actions */
import { LoginUser } from '../actions/UserActions';

/* Service */
import { post } from '../service/API';

/* IMGs */
import LoadingGif from '../assets/img/loading.gif';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const authenticate = (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      post(
        'authentication/',
        {
          username: username,
          password: password,
        }
      ).then((response) => {
        props.LoginUser(response.data.id, response.data.name, response.data.image, response.data.email, response.data.token);
        setLoading(false);
      });
    } catch (error) {
      const { response } = error;
      const { request, ...errorObject } = response;
      const containerError = document.querySelector('[data-error-message]');
      containerError.classList.add('error', 'active');
      containerError.innerHTML = `<span>${JSON.parse(response.request.response).non_field_errors[0]}</span>`;
    }
  }

  return (
    <div className="root">
      {props.userData.id !== 0 ? <Route render={() => (<Redirect to="/" />)} /> : ''}
      <Header />
      <PageTitle title={'Entre em sua conta'} />
      <div className="content">
        <div className="login-area">
          <div className="card-login">
            <form onSubmit={authenticate}>
              <div className="input-area">
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" id="email" placeholder="exemplo@exemplo.com" onChange={(event) => setUsername(event.target.value)} required />
              </div>
              <div className="input-area">
                <label htmlFor="senha">Senha</label>
                <input type="password" name="senha" id="senha" placeholder="*************" onChange={(event) => setPassword(event.target.value)} required />
              </div>
              <div className="submit-area">
                <button className="btn-submit" type="submit">Entrar</button>
              </div>
              <div className={'loading-area' + (loading ? ' active' : '')}>
                <img src={LoadingGif} />
                <span>Carregando...</span>
              </div>
              <div className="message-result-area" data-error-message></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = store => ({
  userData: store.userData.data
});

const mapDispatchProps = dispatch => bindActionCreators({ LoginUser }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Login);