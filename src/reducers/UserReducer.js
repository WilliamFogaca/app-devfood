const INITIAL_STATE_USER = { 
  data: {
    id: 0,
    name: '',
    image: '',
    email: '',
    token: ''
  }
}

export default function UseReducer(state = INITIAL_STATE_USER, action) {
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