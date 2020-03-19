const INITIAL_STATE = { 
  data: {
    id: 0,
    name: '',
    image: '',
    email: '',
    token: ''
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_USER': 
      return { 
        ...state, 
        data: {
          id: action.payload.id, 
          name: action.payload.name, 
          image: action.payload.image,
          email: action.payload.email,
          token: action.payload.token,
        } 
      }
    case 'LOGOUT_USER':
      return { 
        ...state, 
        data: {
          id: 0, 
          name: '', 
          image: '',
          email: '',
          token: '',
        } 
      }
    default:
      return state
  }
}