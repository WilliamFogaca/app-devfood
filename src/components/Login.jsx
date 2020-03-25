import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

/* Components */
import PageTitle from '../templates/PageTitle';
import Header from '../templates/Header';
import ErrorMessage from '../templates/ErrorMessage';
import Loading from '../templates/Loading';

/* Redux Actions */
import { LoginUser } from '../actions/UserActions';

/* Routes URLs */
import { homeRoute } from '../routes/Routes';

/* Service */
import { post } from '../service/API';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  const authenticate = async (event) => {
    event.preventDefault();
    setErrorMessage({});
    setLoading(true);
    try {
      const response = await post(
        'authentication/',
        {
          username: username,
          password: password,
        }
      );
      setLoading(false);
      props.LoginUser(response.data.id, response.data.name, response.data.image, response.data.email, response.data.token);
    } catch (error) {
      const { response } = error;
      const responseErrors = JSON.parse(response.request.response);
      Object.keys(responseErrors).forEach(function (item) {
        setErrorMessage({ key: item, message: responseErrors[item] });
      });
      setLoading(false);
    }
  }

  return (
    <div className="root">
      {props.userData.id !== 0 ? <Redirect to={homeRoute} /> : ''}
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

              {loading ? <Loading /> : ''}

              {errorMessage.key ? <ErrorMessage message={errorMessage.message} /> : ''}
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

const mapDispatchProps = dispatch => bindActionCreators({ LoginUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Login);