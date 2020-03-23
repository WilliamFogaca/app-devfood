
export const ShowModal = (btn, text, isBackLink, recipeId = 0, history = null) => ({
  type: 'SHOW_MODAL',
  payload: { btn, text, isBackLink, recipeId, history }
});

export const HideModal = () => ({
  type: 'HIDE_MODAL'
});
