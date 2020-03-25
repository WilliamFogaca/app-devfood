const INITIAL_STATE_MODAL = { 
  showModal: false,
  modalText: {
    btn: '',
    text: '',
    isBackLink: false
  },
  recipeId: 0
}

export default function ModalReducer(state = INITIAL_STATE_MODAL, action) {
  switch (action.type) {
    case 'SHOW_MODAL': 
      return { 
        ...state, 
        showModal: true,
        modalText: {
          btn: action.payload.btn,
          text: action.payload.text,
          isBackLink: action.payload.isBackLink,
        },
        recipeId: action.payload.recipeId
      }
    case 'HIDE_MODAL':
      return { 
        ...state, 
        showModal: false,
        modalText: {
          btn: '',
          text: '',
          isBackLink: false
        },
        recipeId: 0
      }
    default:
      return state
  }
}