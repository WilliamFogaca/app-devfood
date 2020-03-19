
export const LoginUser = (id, name, image, email, token) => ({
  type: 'LOGIN_USER',
  payload: {id, name, image, email, token}
});

export const LogoutUser = () => ({
  type: 'LOGOUT_USER'
});
